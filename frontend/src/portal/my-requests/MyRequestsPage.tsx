import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { portalApi } from '../../services/api/portal'

const statusStyle: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-700',
  Pending: 'bg-amber-100 text-amber-700',
  'DAC review': 'bg-amber-100 text-amber-700',
  Clarification: 'bg-blue-100 text-blue-700',
  'Approved - pending release': 'bg-emerald-100 text-emerald-700',
  Released: 'bg-secondary/15 text-secondary',
}

export function MyRequestsPage() {
  const { data } = useQuery({
    queryKey: ['access-requests'],
    queryFn: portalApi.listAccessRequests,
  })
  const requests = data ?? []

  const [statusFilter, setStatusFilter] = useState<
    'All' | 'Draft' | 'DAC review' | 'Clarification' | 'Approved - pending release' | 'Released'
  >('All')

  const localDraftRows = useMemo(() => {
    try {
      const raw = localStorage.getItem('hdrwa_access_request_drafts')
      if (!raw) return [] as Array<{
        id: string
        dataset: string
        submittedOn: string
        status: 'Draft'
        resumeTo: string
      }>
      const parsed = JSON.parse(raw) as Array<{
        id: string
        datasetId?: string
        dataset?: string
        updatedAt?: string
      }>
      if (!Array.isArray(parsed)) return []
      return parsed.map((draft) => {
        const params = new URLSearchParams()
        if (draft.datasetId) params.set('datasetId', draft.datasetId)
        if (draft.dataset) params.set('datasetTitle', draft.dataset)
        return {
          id: `local-${draft.id}`,
          dataset: draft.dataset || 'Unspecified dataset',
          submittedOn: draft.updatedAt ? draft.updatedAt.slice(0, 10) : 'Local draft',
          status: 'Draft' as const,
          resumeTo: `/portal/request-access?${params.toString()}`,
        }
      })
    } catch {
      return []
    }
  }, [])

  const combinedRows = useMemo(
    () => [
      ...localDraftRows,
      ...requests.map((request) => ({
        ...request,
        resumeTo:
          request.status === 'Draft'
            ? `/portal/request-access?datasetTitle=${encodeURIComponent(request.dataset)}`
            : '',
      })),
    ],
    [localDraftRows, requests],
  )

  const filtered = useMemo(
    () => combinedRows.filter((request) => statusFilter === 'All' || request.status === statusFilter),
    [combinedRows, statusFilter],
  )

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-heading text-xl font-semibold text-primary">
          My access requests
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-text/70">Filter:</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
            className="rounded-md border border-section bg-white px-2 py-1 text-xs"
          >
            <option value="All">All statuses</option>
            <option value="DAC review">DAC review</option>
            <option value="Clarification">Clarification</option>
            <option value="Approved - pending release">Approved - pending release</option>
            <option value="Released">Released</option>
          </select>
        </div>
      </header>
      <p className="text-xs text-text/80">
        Track DAC review status and Data Manager release status for your dataset access requests.
      </p>
      <div className="rounded-lg border border-section bg-section/30 p-3 text-[11px] text-text/80">
        <span className="font-semibold text-primary">When documents apply:</span>{' '}
        the Data Access Guideline is optional and can be viewed when needed; if status becomes{' '}
        <span className="font-semibold">Approved - pending release</span>, the Data Use Agreement must be signed before release.
      </div>
      <div className="portal-card overflow-x-auto rounded-xl text-xs">
        <table className="min-w-full border-collapse">
          <thead className="bg-section/60 text-[11px] uppercase tracking-wide text-text/70">
            <tr>
              <th className="px-3 py-2 text-left">Request ID</th>
              <th className="px-3 py-2 text-left">Dataset</th>
              <th className="px-3 py-2 text-left">Submitted</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-section/80">
                <td className="px-3 py-2">{r.id}</td>
                <td className="px-3 py-2">{r.dataset}</td>
                <td className="px-3 py-2">{r.submittedOn}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {r.status === 'Draft' && r.resumeTo ? (
                    <Link
                      to={r.resumeTo}
                      className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-secondary/90"
                    >
                      Resume draft
                    </Link>
                  ) : (
                    <span className="text-text/50">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

