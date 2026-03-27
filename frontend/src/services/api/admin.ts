import { apiRequest } from './client'

export const adminApi = {
  resetDemoData: () =>
    apiRequest<{ ok: boolean }>('/api/demo/reset', {
      method: 'POST',
    }),
}
