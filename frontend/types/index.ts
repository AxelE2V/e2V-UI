// Contact types
export type ContactStatus =
  | 'new'
  | 'contacted'
  | 'engaged'
  | 'qualified'
  | 'meeting_booked'
  | 'not_interested'
  | 'bounced'
  | 'unsubscribed'

export type Industry =
  | 'chemical_recycling'
  | 'packaging'
  | 'tires'
  | 'plastics'
  | 'weee'
  | 'other'

export type Persona =
  | 'sustainability_manager'
  | 'operations_director'
  | 'ceo'
  | 'procurement'
  | 'compliance'
  | 'other'

export type CompanySegment =
  | 'chemical_recycling'
  | 'tire_recycling'
  | 'food_grade_packaging'
  | 'eco_organisme'
  | 'flexible_packaging'
  | 'plastic_compounder'
  | 'waste_management'
  | 'fmcg_brand'
  | 'equipment_provider'
  | 'other'

export type ICPTier = 'tier_1' | 'tier_2' | 'tier_3' | 'non_target'

export interface Contact {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  company: string | null
  job_title: string | null
  linkedin_url: string | null
  industry: Industry
  persona: Persona
  status: ContactStatus
  hubspot_id: string | null
  emails_sent: number
  emails_opened: number
  emails_clicked: number
  last_contacted_at: string | null
  last_replied_at: string | null
  is_unsubscribed: boolean
  notes: string | null
  created_at: string
  updated_at: string
  // ICP Scoring
  company_segment: CompanySegment | null
  icp_score: number
  icp_tier: ICPTier | null
  iscc_certified: boolean
  iscc_in_progress: boolean
  multi_sites_eu: boolean
  epr_ppwr_exposure: boolean
  employees_over_100: boolean
  visible_it_budget: boolean
  // Enrichment
  company_size: string | null
  company_revenue: string | null
  company_country: string | null
  company_website: string | null
}

// Sequence types
export type StepType = 'email' | 'call' | 'linkedin' | 'task'
export type SequenceStatus = 'draft' | 'active' | 'paused' | 'archived'
export type ContactSequenceStatus = 'active' | 'paused' | 'completed' | 'replied' | 'bounced' | 'unsubscribed'

export interface SequenceStep {
  id: number
  sequence_id: number
  step_order: number
  step_type: StepType
  delay_days: number
  template_id: number | null
  subject_override: string | null
  task_description: string | null
  created_at: string
}

export interface Sequence {
  id: number
  name: string
  description: string | null
  target_industry: string | null
  target_persona: string | null
  status: SequenceStatus
  steps: SequenceStep[]
  total_enrolled: number
  active_enrolled: number
  created_at: string
  updated_at: string
}

export interface ContactSequence {
  id: number
  contact_id: number
  sequence_id: number
  current_step: number
  status: ContactSequenceStatus
  enrolled_at: string
  next_step_at: string | null
  completed_at: string | null
}

// Template types
export interface EmailTemplate {
  id: number
  name: string
  description: string | null
  subject: string
  body_html: string
  body_text: string | null
  category: string | null
  target_persona: string | null
  target_industry: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

// Activity types
export type ActivityType =
  | 'email_sent'
  | 'email_opened'
  | 'email_clicked'
  | 'email_replied'
  | 'email_bounced'
  | 'call_made'
  | 'call_answered'
  | 'call_no_answer'
  | 'meeting_booked'
  | 'linkedin_sent'
  | 'linkedin_accepted'
  | 'note_added'
  | 'status_changed'

export interface Activity {
  id: number
  contact_id: number
  activity_type: ActivityType
  description: string | null
  email_subject: string | null
  email_message_id: string | null
  sequence_id: number | null
  sequence_step: number | null
  hubspot_synced: boolean
  performed_at: string
  performed_by: string
}

// Dashboard types
export interface DashboardStats {
  total_contacts: number
  contacts_in_sequence: number
  contacts_new: number
  contacts_engaged: number
  contacts_meeting_booked: number
  emails_sent_30d: number
  emails_opened_30d: number
  emails_replied_30d: number
  open_rate: number
  reply_rate: number
  active_sequences: number
  total_sequences: number
}

export interface TodayActionItem {
  id: number
  contact_id: number
  contact_name: string
  contact_email: string
  contact_company: string | null
  sequence_id: number
  sequence_name: string
  step_number: number
  step_type: StepType
  template_id: number | null
  template_name: string | null
  subject_preview: string | null
  task_description: string | null
  scheduled_at: string
}

export interface TodayActions {
  date: string
  total_actions: number
  email_actions: number
  call_actions: number
  other_actions: number
  actions: TodayActionItem[]
}

// ICP Scoring types
export interface ContactScoreUpdate {
  company_segment?: CompanySegment
  iscc_certified?: boolean
  iscc_in_progress?: boolean
  multi_sites_eu?: boolean
  epr_ppwr_exposure?: boolean
  employees_over_100?: boolean
  visible_it_budget?: boolean
}

export interface ICPScoreResponse {
  contact_id: number
  icp_score: number
  icp_tier: ICPTier
  priority_label: string
  scoring_breakdown: Record<string, number>
}

export interface SegmentStats {
  by_tier: Record<string, number>
  by_segment: Record<string, number>
  average_score: number
  total_contacts: number
  high_priority_count: number
}

// Enrichment types
export interface EnrichmentResponse {
  contact_id: number
  enriched: boolean
  source: string | null
  updates: Record<string, unknown>
  icp_updates: Record<string, unknown>
  new_score: number
  new_tier: ICPTier | null
  errors: string[]
}

export interface EnrichmentBatchResponse {
  total: number
  enriched: number
  errors: number
  message: string
}

export interface EnrichmentStatus {
  total_contacts: number
  contacts_with_phone: number
  contacts_missing_phone: number
  segmented_contacts: number
  contacts_with_icp_criteria: number
  lusha_configured: boolean
  auto_enrichment_enabled: boolean
}
