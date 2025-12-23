"""
Dashboard API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta, date

from core.database import get_db
from models.contact import Contact, ContactStatus
from models.sequence import Sequence, ContactSequence, SequenceStatus
from models.activity import Activity, ActivityType
from schemas.dashboard import DashboardStats, TodayActions, TodayActionItem
from services.sequence_engine import SequenceEngine
from services.sendgrid import SendGridService

router = APIRouter()


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get dashboard KPIs and statistics"""

    # Contact stats
    total_contacts = db.query(Contact).count()

    contacts_in_sequence = db.query(Contact).join(ContactSequence).filter(
        ContactSequence.status == "active"
    ).distinct().count()

    contacts_new = db.query(Contact).filter(Contact.status == ContactStatus.NEW).count()
    contacts_engaged = db.query(Contact).filter(Contact.status == ContactStatus.ENGAGED).count()
    contacts_meeting = db.query(Contact).filter(Contact.status == ContactStatus.MEETING_BOOKED).count()

    # Email stats (last 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)

    emails_sent = db.query(Activity).filter(
        Activity.activity_type == ActivityType.EMAIL_SENT,
        Activity.performed_at >= thirty_days_ago
    ).count()

    emails_opened = db.query(Activity).filter(
        Activity.activity_type == ActivityType.EMAIL_OPENED,
        Activity.performed_at >= thirty_days_ago
    ).count()

    emails_replied = db.query(Activity).filter(
        Activity.activity_type == ActivityType.EMAIL_REPLIED,
        Activity.performed_at >= thirty_days_ago
    ).count()

    # Calculate rates
    open_rate = (emails_opened / emails_sent * 100) if emails_sent > 0 else 0.0
    reply_rate = (emails_replied / emails_sent * 100) if emails_sent > 0 else 0.0

    # Sequence stats
    active_sequences = db.query(Sequence).filter(
        Sequence.status == SequenceStatus.ACTIVE
    ).count()

    total_sequences = db.query(Sequence).count()

    return DashboardStats(
        total_contacts=total_contacts,
        contacts_in_sequence=contacts_in_sequence,
        contacts_new=contacts_new,
        contacts_engaged=contacts_engaged,
        contacts_meeting_booked=contacts_meeting,
        emails_sent_30d=emails_sent,
        emails_opened_30d=emails_opened,
        emails_replied_30d=emails_replied,
        open_rate=round(open_rate, 1),
        reply_rate=round(reply_rate, 1),
        active_sequences=active_sequences,
        total_sequences=total_sequences
    )


@router.get("/today", response_model=TodayActions)
def get_today_actions(
    target_date: date = None,
    db: Session = Depends(get_db)
):
    """
    Get all actions due for today (or specified date)
    This is the main "Actions du Jour" endpoint
    """
    engine = SequenceEngine(db)
    return engine.get_today_actions(target_date)


@router.post("/today/{action_id}/execute-email")
async def execute_email_action(
    action_id: int,
    send_email: bool = True,
    db: Session = Depends(get_db)
):
    """
    Execute an email action from today's list

    - Renders the template with contact data
    - Optionally sends via SendGrid
    - Logs the activity
    - Advances the sequence
    - Syncs to HubSpot
    """
    engine = SequenceEngine(db)

    # Get enrollment
    enrollment = db.query(ContactSequence).filter(
        ContactSequence.id == action_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=404, detail="Action not found")

    contact = enrollment.contact
    sequence = enrollment.sequence

    # Get current step and template
    from models.sequence import SequenceStep
    from models.template import EmailTemplate

    step = db.query(SequenceStep).filter(
        SequenceStep.sequence_id == sequence.id,
        SequenceStep.step_order == enrollment.current_step
    ).first()

    if not step or not step.template_id:
        raise HTTPException(status_code=400, detail="Step has no email template")

    template = db.query(EmailTemplate).filter(
        EmailTemplate.id == step.template_id
    ).first()

    # Render email
    variables = contact.to_template_vars()
    subject, body_html, body_text = template.render(variables)

    # Override subject if specified
    if step.subject_override:
        subject = step.subject_override

    result = {
        "contact": contact.full_name,
        "email": contact.email,
        "subject": subject,
        "body_preview": body_html[:500] + "..." if len(body_html) > 500 else body_html
    }

    # Send email if requested
    message_id = None
    if send_email and not contact.is_unsubscribed:
        sendgrid = SendGridService()
        send_result = await sendgrid.send_email(
            to_email=contact.email,
            to_name=contact.full_name,
            subject=subject,
            html_content=body_html,
            text_content=body_text,
            custom_args={
                "contact_id": str(contact.id),
                "sequence_id": str(sequence.id),
                "step": str(step.step_order)
            }
        )

        result["send_result"] = send_result
        if send_result["success"]:
            message_id = send_result["message_id"]

    # Log activity and advance sequence
    activity = engine.execute_email_step(action_id, message_id)
    result["activity_id"] = activity.id
    result["message"] = "Email action executed successfully"

    return result


@router.post("/today/{action_id}/execute-call")
def execute_call_action(
    action_id: int,
    outcome: str,  # "answered", "no_answer"
    notes: str = "",
    db: Session = Depends(get_db)
):
    """
    Execute a call action from today's list

    - Logs the call activity
    - Advances the sequence
    """
    engine = SequenceEngine(db)

    try:
        activity = engine.execute_call_step(action_id, outcome, notes)
        return {
            "message": "Call action executed",
            "activity_id": activity.id,
            "outcome": outcome
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/today/{action_id}/skip")
def skip_action(action_id: int, db: Session = Depends(get_db)):
    """Skip an action and move to next step"""
    engine = SequenceEngine(db)

    enrollment = db.query(ContactSequence).filter(
        ContactSequence.id == action_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=404, detail="Action not found")

    engine.advance_to_next_step(enrollment)

    return {"message": "Action skipped, moved to next step"}


@router.post("/today/{action_id}/replied")
def mark_replied(action_id: int, db: Session = Depends(get_db)):
    """Mark contact as replied - stops the sequence"""
    engine = SequenceEngine(db)
    success = engine.mark_replied(action_id)

    if not success:
        raise HTTPException(status_code=404, detail="Action not found")

    return {"message": "Contact marked as replied, sequence stopped"}
