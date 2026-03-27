import { apiRequest } from './client'

export type DatasetRecord = {
  id: string
  title: string
  institution: string
  country: string
  topic: string
  accessLevel: 'Open' | 'Controlled' | 'Restricted'
  lastUpdated: string
}

export const datasetsApi = {
  listDatasets: () => apiRequest<DatasetRecord[]>('/api/datasets'),
}
