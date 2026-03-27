import { apiRequest } from './client'

export const authApi = {
  createRegistration: (payload: {
    fullName: string
    email: string
    institution: string
    country: string
    requestedRole: string
    justification: string
  }) =>
    apiRequest<{ id: string }>('/api/registrations', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
