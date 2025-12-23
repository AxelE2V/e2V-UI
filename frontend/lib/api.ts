const API_BASE = '/api'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(error.detail || `API Error: ${response.status}`)
  }

  return response.json()
}

// Dashboard
export const dashboardAPI = {
  getStats: () => fetchAPI<import('@/types').DashboardStats>('/dashboard/stats'),
  getTodayActions: () => fetchAPI<import('@/types').TodayActions>('/dashboard/today'),
  executeEmail: (actionId: number, sendEmail = true) =>
    fetchAPI(`/dashboard/today/${actionId}/execute-email?send_email=${sendEmail}`, { method: 'POST' }),
  executeCall: (actionId: number, outcome: string, notes = '') =>
    fetchAPI(`/dashboard/today/${actionId}/execute-call?outcome=${outcome}&notes=${encodeURIComponent(notes)}`, { method: 'POST' }),
  skipAction: (actionId: number) =>
    fetchAPI(`/dashboard/today/${actionId}/skip`, { method: 'POST' }),
  markReplied: (actionId: number) =>
    fetchAPI(`/dashboard/today/${actionId}/replied`, { method: 'POST' }),
}

// Contacts
export const contactsAPI = {
  list: (params?: { page?: number; status?: string; industry?: string; search?: string }) => {
    const query = new URLSearchParams()
    if (params?.page) query.set('page', params.page.toString())
    if (params?.status) query.set('status', params.status)
    if (params?.industry) query.set('industry', params.industry)
    if (params?.search) query.set('search', params.search)
    return fetchAPI<{ contacts: import('@/types').Contact[]; total: number; page: number; per_page: number }>(
      `/contacts?${query}`
    )
  },
  get: (id: number) => fetchAPI<import('@/types').Contact>(`/contacts/${id}`),
  create: (data: Partial<import('@/types').Contact>) =>
    fetchAPI<import('@/types').Contact>('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<import('@/types').Contact>) =>
    fetchAPI<import('@/types').Contact>(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchAPI(`/contacts/${id}`, { method: 'DELETE' }),
}

// Sequences
export const sequencesAPI = {
  list: (status?: string) => {
    const query = status ? `?status=${status}` : ''
    return fetchAPI<import('@/types').Sequence[]>(`/sequences${query}`)
  },
  get: (id: number) => fetchAPI<import('@/types').Sequence>(`/sequences/${id}`),
  create: (data: Partial<import('@/types').Sequence>) =>
    fetchAPI<import('@/types').Sequence>('/sequences', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<import('@/types').Sequence>) =>
    fetchAPI<import('@/types').Sequence>(`/sequences/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchAPI(`/sequences/${id}`, { method: 'DELETE' }),
  enroll: (sequenceId: number, contactId: number) =>
    fetchAPI(`/sequences/${sequenceId}/enroll`, {
      method: 'POST',
      body: JSON.stringify({ contact_id: contactId, sequence_id: sequenceId })
    }),
  enrollBulk: (sequenceId: number, contactIds: number[]) =>
    fetchAPI(`/sequences/${sequenceId}/enroll-bulk`, { method: 'POST', body: JSON.stringify(contactIds) }),
}

// Templates
export const templatesAPI = {
  list: () => fetchAPI<import('@/types').EmailTemplate[]>('/templates'),
  get: (id: number) => fetchAPI<import('@/types').EmailTemplate>(`/templates/${id}`),
  create: (data: Partial<import('@/types').EmailTemplate>) =>
    fetchAPI<import('@/types').EmailTemplate>('/templates', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<import('@/types').EmailTemplate>) =>
    fetchAPI<import('@/types').EmailTemplate>(`/templates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchAPI(`/templates/${id}`, { method: 'DELETE' }),
  preview: (templateId: number, contactId?: number) =>
    fetchAPI<{ subject: string; body_html: string; body_text: string }>('/templates/preview', {
      method: 'POST',
      body: JSON.stringify({ template_id: templateId, contact_id: contactId })
    }),
  getVariables: () => fetchAPI<{ variables: string[]; usage: string }>('/templates/variables'),
}

// HubSpot
export const hubspotAPI = {
  importContacts: () => fetchAPI('/hubspot/sync/contacts/import', { method: 'POST' }),
  pushContact: (contactId: number) => fetchAPI(`/hubspot/sync/contacts/${contactId}/push`, { method: 'POST' }),
  checkStatus: () => fetchAPI<{ status: string; message: string }>('/hubspot/status'),
}

// Activities
export const activitiesAPI = {
  list: (contactId?: number, days = 30) => {
    const query = new URLSearchParams({ days: days.toString() })
    if (contactId) query.set('contact_id', contactId.toString())
    return fetchAPI<import('@/types').Activity[]>(`/activities?${query}`)
  },
  getForContact: (contactId: number) =>
    fetchAPI<import('@/types').Activity[]>(`/activities/contact/${contactId}`),
}
