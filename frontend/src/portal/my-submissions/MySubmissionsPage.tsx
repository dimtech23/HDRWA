import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { portalApi } from '../../services/api/portal'
import { useAuth } from '../../hooks/AuthContext'

const statusStyle: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-700',
  'Under review': 'bg-blue-100 text-blue-700',
  Published: 'bg-emerald-100 text-emerald-700',
}

export function MySubmissionsPage() {
  const { user } = useAuth()
  const canView = user?.role === 'contributor' || user?.role === 'manager'
  const { data } = useQuery({
    queryKey: ['submissions'],
    queryFn: portalApi.listSubmissions,
  })
  const submissions = data ?? []

  const [statusFilter, setStatusFilter] = useState<'All' | 'Draft' | 'Under review' | 'Published'>('All')

  const localDraftRows = useMemo(() => {
    try {
      const raw = localStorage.getItem('hdrwa_dataset_submission_drafts')
      if (!raw) {
        return [] as Array<{
          id: string
          title: string
          updatedAt: string
          status: 'Draft'
          resumeTo: string
        }>
      }
      const parsed = JSON.parse(raw) as Array<{
        id?: string
        datasetId?: string
        datasetTitle?: string
        institution?: string
        topic?: string
        country?: string
        accessLevel?: 'Open' | 'Controlled' | 'Restricted'
        updatedAt?: string
      }>
      if (!Array.isArray(parsed)) return []
      return parsed.map((draft) => {
        const params = new URLSearchParams()
        if (draft.datasetId) params.set('datasetId', draft.datasetId)
        if (draft.datasetTitle) params.set('datasetTitle', draft.datasetTitle)
        if (draft.institution) params.set('institution', draft.institution)
        if (draft.topic) params.set('topic', draft.topic)
        if (draft.country) params.set('country', draft.country)
        if (draft.accessLevel) params.set('accessLevel', draft.accessLevel)
        return {
          id: `local-${draft.id || draft.datasetId || draft.datasetTitle || Date.now()}`,
          title: draft.datasetTitle || 'Untitled dataset draft',
          updatedAt: draft.updatedAt ? draft.updatedAt.slice(0, 10) : 'Local draft',
          status: 'Draft' as const,
          resumeTo: `/portal/submit-dataset?${params.toString()}`,
        }
      })
    } catch {
      return []
    }
  }, [])

  const combinedRows = useMemo(
    () => [
      ...localDraftRows,
      ...submissions.map((submission) => ({
        ...submission,
        resumeTo:
          submission.status === 'Draft'
            ? `/portal/submit-dataset?datasetTitle=${encodeURIComponent(submission.title)}`
            : '',
      })),
    ],
    [localDraftRows, submissions],
  )

  const filtered = useMemo(
    () => combinedRows.filter((submission) => statusFilter === 'All' || submission.status === statusFilter),
    [combinedRows, statusFilter],
  )

  if (!canView) {
    return (
      <div className="space-y-4">
        <h1 className="font-heading text-xl font-semibold text-primary">My submissions</h1>
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Submission workflow is available for contributor and Data Manager roles.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-heading text-xl font-semibold text-primary">
          My submissions
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-text/70">Filter:</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
            className="rounded-md border border-section bg-white px-2 py-1 text-xs"
          >
            <option value="All">All statuses</option>
            <option value="Draft">Draft</option>
            <option value="Under review">Under review</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </header>
      <p className="text-xs text-text/80">
        Track your draft, under review, and published datasets.
      </p>
      <div className="portal-card overflow-x-auto rounded-xl text-xs">
        <table className="min-w-full border-collapse">
          <thead className="bg-section/60 text-[11px] uppercase tracking-wide text-text/70">
            <tr>
              <th className="px-3 py-2 text-left">Submission ID</th>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Updated</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-section/80">
                <td className="px-3 py-2">{s.id}</td>
                <td className="px-3 py-2">{s.title}</td>
                <td className="px-3 py-2">{s.updatedAt}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyle[s.status]}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {s.status === 'Draft' && s.resumeTo ? (
                    <Link
                      to={s.resumeTo}
                      className="inline-flex rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-primary/90"
                    >
                      Continue draft
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

