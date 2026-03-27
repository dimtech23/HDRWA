import { apiRequest } from './client'
import type {
  ContentUpdate,
  DatasetOperation,
  GovernanceContact,
  GovernanceRisk,
  SiteSectionHealth,
} from '../../admin/data/governanceCrm'

export const governanceApi = {
  listContentUpdates: () => apiRequest<ContentUpdate[]>('/api/content-updates'),
  createContentUpdate: (payload: Omit<ContentUpdate, 'id'>) =>
    apiRequest<{ id: string }>('/api/content-updates', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  patchContentUpdateStatus: (id: string, status: ContentUpdate['status']) =>
    apiRequest<{ ok: boolean }>(`/api/content-updates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status,
        lastEdited: new Date().toISOString().slice(0, 10),
      }),
    }),
  listDatasetOperations: () => apiRequest<DatasetOperation[]>('/api/dataset-operations'),
  createDatasetOperation: (payload: Omit<DatasetOperation, 'id'>) =>
    apiRequest<{ id: string }>('/api/dataset-operations', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  patchDatasetOperation: (
    id: string,
    payload: Pick<DatasetOperation, 'stage' | 'qaStatus' | 'nextAction'>,
  ) =>
    apiRequest<{ ok: boolean }>(`/api/dataset-operations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  listSiteHealth: () => apiRequest<SiteSectionHealth[]>('/api/site-section-health'),
  listRisks: () => apiRequest<GovernanceRisk[]>('/api/governance-risks'),
  listContacts: () => apiRequest<GovernanceContact[]>('/api/governance-contacts'),
  createContact: (payload: Omit<GovernanceContact, 'id'>) =>
    apiRequest<{ id: string }>('/api/governance-contacts', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  patchContactStage: (
    id: string,
    engagementStage: GovernanceContact['engagementStage'],
  ) =>
    apiRequest<{ ok: boolean }>(`/api/governance-contacts/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({
        engagementStage,
        lastEngagement: new Date().toISOString().slice(0, 10),
      }),
    }),
}
