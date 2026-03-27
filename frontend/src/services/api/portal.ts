import { apiRequest } from './client'

export type SubmissionRecord = {
  id: string
  title: string
  institution: string
  status: string
  updatedAt: string
}

export type AccessRequestRecord = {
  id: string
  dataset: string
  purpose: string
  status: string
  submittedOn: string
}

export const portalApi = {
  listSubmissions: () => apiRequest<SubmissionRecord[]>('/api/submissions'),
  createSubmission: (payload: {
    title: string
    institution: string
    country?: string
    topic?: string
    accessLevel?: 'Open' | 'Controlled' | 'Restricted'
  }) =>
    apiRequest<{ id: string }>('/api/submissions', {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        updatedAt: new Date().toISOString().slice(0, 10),
      }),
    }),
  listAccessRequests: () => apiRequest<AccessRequestRecord[]>('/api/access-requests'),
  createAccessRequest: (payload: { dataset: string; purpose: string }) =>
    apiRequest<{ id: string }>('/api/access-requests', {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        submittedOn: new Date().toISOString().slice(0, 10),
      }),
    }),
  patchAccessRequestStatus: (id: string, status: string) =>
    apiRequest<{ ok: boolean }>(`/api/access-requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}
