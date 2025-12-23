"""
Sequence Engine - Manages sequence execution and "Actions du Jour"
"""
from typing import List, Optional
from datetime import datetime, date, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import and_

from models.contact import Contact
from models.sequence import (
    Sequence, SequenceStep, ContactSequence,
    StepType, SequenceStatus, ContactSequenceStatus
)
from models.template import EmailTemplate
from models.activity import Activity, ActivityType
from schemas.dashboard import TodayActionItem, TodayActions


class SequenceEngine:
    def __init__(self, db: Session):
        self.db = db

    def enroll_contact(
        self,
        contact_id: int,
        sequence_id: int,
        start_immediately: bool = True
    ) -> ContactSequence:
        """
        Enroll a contact in a sequence

        Args:
            contact_id: Contact to enroll
            sequence_id: Sequence to enroll in
            start_immediately: If True, first step is scheduled for now
        """
        # Check if already enrolled
        existing = self.db.query(ContactSequence).filter(
            and_(
                ContactSequence.contact_id == contact_id,
                ContactSequence.sequence_id == sequence_id,
                ContactSequence.status == ContactSequenceStatus.ACTIVE
            )
        ).first()

        if existing:
            raise ValueError("Contact already enrolled in this sequence")

        # Get first step to calculate next_step_at
        first_step = self.db.query(SequenceStep).filter(
            SequenceStep.sequence_id == sequence_id,
            SequenceStep.step_order == 1
        ).first()

        if not first_step:
            raise ValueError("Sequence has no steps")

        if start_immediately:
            next_step_at = datetime.utcnow()
        else:
            next_step_at = datetime.utcnow() + timedelta(days=first_step.delay_days)

        enrollment = ContactSequence(
            contact_id=contact_id,
            sequence_id=sequence_id,
            current_step=1,
            status=ContactSequenceStatus.ACTIVE,
            next_step_at=next_step_at
        )

        self.db.add(enrollment)
        self.db.commit()
        self.db.refresh(enrollment)

        return enrollment

    def unenroll_contact(self, contact_sequence_id: int) -> bool:
        """Remove contact from sequence"""
        enrollment = self.db.query(ContactSequence).filter(
            ContactSequence.id == contact_sequence_id
        ).first()

        if not enrollment:
            return False

        enrollment.status = ContactSequenceStatus.COMPLETED
        enrollment.completed_at = datetime.utcnow()
        self.db.commit()

        return True

    def advance_to_next_step(self, contact_sequence: ContactSequence) -> bool:
        """
        Mark current step as done and schedule next step
        Called after executing a step
        """
        sequence = contact_sequence.sequence
        current_step_num = contact_sequence.current_step

        # Get next step
        next_step = self.db.query(SequenceStep).filter(
            SequenceStep.sequence_id == sequence.id,
            SequenceStep.step_order == current_step_num + 1
        ).first()

        if next_step:
            # Schedule next step
            contact_sequence.current_step = next_step.step_order
            contact_sequence.next_step_at = datetime.utcnow() + timedelta(days=next_step.delay_days)
        else:
            # Sequence completed
            contact_sequence.status = ContactSequenceStatus.COMPLETED
            contact_sequence.completed_at = datetime.utcnow()
            contact_sequence.next_step_at = None

        self.db.commit()
        return True

    def mark_replied(self, contact_sequence_id: int) -> bool:
        """Mark contact as replied - stops the sequence"""
        enrollment = self.db.query(ContactSequence).filter(
            ContactSequence.id == contact_sequence_id
        ).first()

        if not enrollment:
            return False

        enrollment.status = ContactSequenceStatus.REPLIED
        enrollment.completed_at = datetime.utcnow()
        self.db.commit()

        # Also update contact status
        contact = self.db.query(Contact).filter(
            Contact.id == enrollment.contact_id
        ).first()
        if contact:
            contact.status = "engaged"
            contact.last_replied_at = datetime.utcnow()
            self.db.commit()

        return True

    def get_today_actions(self, target_date: date = None) -> TodayActions:
        """
        Get all actions due for today (or specified date)
        This is the core of the "Actions du Jour" feature
        """
        if target_date is None:
            target_date = date.today()

        # Get start and end of target date
        start_of_day = datetime.combine(target_date, datetime.min.time())
        end_of_day = datetime.combine(target_date, datetime.max.time())

        # Query enrollments with steps due today
        enrollments = self.db.query(ContactSequence).filter(
            and_(
                ContactSequence.status == ContactSequenceStatus.ACTIVE,
                ContactSequence.next_step_at <= end_of_day
            )
        ).all()

        actions = []
        email_count = 0
        call_count = 0
        other_count = 0

        for enrollment in enrollments:
            contact = enrollment.contact
            sequence = enrollment.sequence

            # Get current step details
            step = self.db.query(SequenceStep).filter(
                SequenceStep.sequence_id == sequence.id,
                SequenceStep.step_order == enrollment.current_step
            ).first()

            if not step:
                continue

            # Get template info for email steps
            template_id = None
            template_name = None
            subject_preview = None

            if step.step_type == StepType.EMAIL and step.template_id:
                template = self.db.query(EmailTemplate).filter(
                    EmailTemplate.id == step.template_id
                ).first()
                if template:
                    template_id = template.id
                    template_name = template.name
                    # Render subject with contact vars for preview
                    rendered = template.render(contact.to_template_vars())
                    subject_preview = rendered[0][:100]  # First 100 chars

            action = TodayActionItem(
                id=enrollment.id,
                contact_id=contact.id,
                contact_name=contact.full_name,
                contact_email=contact.email,
                contact_company=contact.company,
                sequence_id=sequence.id,
                sequence_name=sequence.name,
                step_number=step.step_order,
                step_type=step.step_type,
                template_id=template_id,
                template_name=template_name,
                subject_preview=subject_preview,
                task_description=step.task_description,
                scheduled_at=enrollment.next_step_at
            )
            actions.append(action)

            # Count by type
            if step.step_type == StepType.EMAIL:
                email_count += 1
            elif step.step_type == StepType.CALL:
                call_count += 1
            else:
                other_count += 1

        # Sort by scheduled time
        actions.sort(key=lambda a: a.scheduled_at)

        return TodayActions(
            date=target_date,
            total_actions=len(actions),
            email_actions=email_count,
            call_actions=call_count,
            other_actions=other_count,
            actions=actions
        )

    def execute_email_step(
        self,
        contact_sequence_id: int,
        sendgrid_message_id: str = None
    ) -> Activity:
        """
        Record execution of an email step
        Called after manually sending the email
        """
        enrollment = self.db.query(ContactSequence).filter(
            ContactSequence.id == contact_sequence_id
        ).first()

        if not enrollment:
            raise ValueError("Enrollment not found")

        contact = enrollment.contact
        sequence = enrollment.sequence

        step = self.db.query(SequenceStep).filter(
            SequenceStep.sequence_id == sequence.id,
            SequenceStep.step_order == enrollment.current_step
        ).first()

        # Get subject from template
        subject = "Email"
        if step.template_id:
            template = self.db.query(EmailTemplate).filter(
                EmailTemplate.id == step.template_id
            ).first()
            if template:
                rendered = template.render(contact.to_template_vars())
                subject = rendered[0]

        # Log activity
        activity = Activity(
            contact_id=contact.id,
            activity_type=ActivityType.EMAIL_SENT,
            description=f"Sent email from sequence: {sequence.name}",
            email_subject=subject,
            email_message_id=sendgrid_message_id,
            sequence_id=sequence.id,
            sequence_step=step.step_order
        )
        self.db.add(activity)

        # Update contact stats
        contact.emails_sent += 1
        contact.last_contacted_at = datetime.utcnow()
        if contact.status == "new":
            contact.status = "contacted"

        self.db.commit()

        # Advance to next step
        self.advance_to_next_step(enrollment)

        return activity

    def execute_call_step(
        self,
        contact_sequence_id: int,
        outcome: str,  # "answered", "no_answer", "left_voicemail"
        notes: str = ""
    ) -> Activity:
        """
        Record execution of a call step
        """
        enrollment = self.db.query(ContactSequence).filter(
            ContactSequence.id == contact_sequence_id
        ).first()

        if not enrollment:
            raise ValueError("Enrollment not found")

        contact = enrollment.contact
        sequence = enrollment.sequence

        # Map outcome to activity type
        activity_type_map = {
            "answered": ActivityType.CALL_ANSWERED,
            "no_answer": ActivityType.CALL_NO_ANSWER,
        }
        activity_type = activity_type_map.get(outcome, ActivityType.CALL_MADE)

        # Log activity
        activity = Activity(
            contact_id=contact.id,
            activity_type=activity_type,
            description=notes or f"Call from sequence: {sequence.name}",
            sequence_id=sequence.id,
            sequence_step=enrollment.current_step
        )
        self.db.add(activity)

        # Update contact
        contact.last_contacted_at = datetime.utcnow()

        self.db.commit()

        # Advance to next step
        self.advance_to_next_step(enrollment)

        return activity
