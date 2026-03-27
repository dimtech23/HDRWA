import { apiRequest } from './client'

export type PartnerKind = 'Partner' | 'Donor'

export type PartnerDonorRecord = {
  id: string
  name: string
  url: string
  logoPath: string
  kind: PartnerKind
  displayOrder: number
}

export const partnersApi = {
  listPartnersDonors: () => apiRequest<PartnerDonorRecord[]>('/api/partners-donors'),
  createPartnerDonor: (payload: {
    name: string
    url: string
    logoPath: string // filename under public/, e.g. 'WANETAM logo.png'
    kind: PartnerKind
    displayOrder?: number
  }) =>
    apiRequest<{ id: string }>('/api/partners-donors', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

