import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AnalyticsCharts } from '../../components/charts/AnalyticsCharts'
import { portalApi } from '../../services/api/portal'
import { datasetsApi } from '../../services/api/datasets'
import { useAuth } from '../../hooks/AuthContext'

export function DashboardOverviewPage() {
  const { user } = useAuth()
  const role = user?.role
  const canSubmit = role === 'contributor' || role === 'manager'
  const canReviewMetadata = role === 'manager'
  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions'],
    queryFn: portalApi.listSubmissions,
  })
  const { data: requests = [] } = useQuery({
    queryKey: ['access-requests'],
    queryFn: portalApi.listAccessRequests,
  })
  const { data: datasets = [] } = useQuery({
    queryKey: ['datasets'],
    queryFn: datasetsApi.listDatasets,
  })
  const draftCount = submissions.filter((item) => item.status === 'Draft').length
  const reviewCount = submissions.filter((item) => item.status === 'Under review').length
  const openAccessCount = datasets.filter((item) => item.accessLevel === 'Open').length
  const submissionDraftItems = (() => {
    try {
      const raw = localStorage.getItem('hdrwa_dataset_submission_drafts')
      if (!raw) return [] as Array<{ label: string; to: string }>
      const parsed = JSON.parse(raw) as Array<{
        datasetId?: string
        datasetTitle?: string
        institution?: string
        topic?: string
        country?: string
        accessLevel?: 'Open' | 'Controlled' | 'Restricted'
      }>
      if (!Array.isArray(parsed)) return []
      return parsed.map((item) => {
        const params = new URLSearchParams()
        if (item.datasetId) params.set('datasetId', item.datasetId)
        if (item.datasetTitle) params.set('datasetTitle', item.datasetTitle)
        if (item.institution) params.set('institution', item.institution)
        if (item.topic) params.set('topic', item.topic)
        if (item.country) params.set('country', item.country)
        if (item.accessLevel) params.set('accessLevel', item.accessLevel)
        return {
          label: item.datasetTitle || 'Untitled dataset draft',
          to: `/portal/submit-dataset?${params.toString()}`,
        }
      })
    } catch {
      return []
    }
  })()
  const accessDraftItems = (() => {
    try {
      const raw = localStorage.getItem('hdrwa_access_request_drafts')
      if (!raw) return [] as Array<{ label: string; to: string }>
      const parsed = JSON.parse(raw) as Array<{ datasetId?: string; dataset?: string }>
      if (!Array.isArray(parsed)) return []
      return parsed.map((item) => {
        const params = new URLSearchParams()
        if (item.datasetId) params.set('datasetId', item.datasetId)
        if (item.dataset) params.set('datasetTitle', item.dataset)
        return {
          label: item.dataset || 'Untitled access request draft',
          to: `/portal/request-access?${params.toString()}`,
        }
      })
    } catch {
      return []
    }
  })()

  return (
    <div className="space-y-4">
      <header className="mb-1">
        <h1 className="font-heading text-xl font-semibold text-primary">
          Dashboard overview
        </h1>
        <p className="mt-1 text-xs text-text/80">
          High-level view of your datasets and access activity.
        </p>
      </header>
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-text/80">
        {role === 'researcher' && (
          <span>
            You are a Researcher: submit access requests in the platform, then track DAC review and release status in My requests.
          </span>
        )}
        {role === 'contributor' && (
          <span>
            You are a Contributor: submit datasets and keep metadata complete for Data Manager verification.
          </span>
        )}
        {role === 'manager' && (
          <span>
            You are a Data Manager: verify dataset checklists, monitor DAC decisions, and coordinate release after mandatory Data Use Agreement completion.
          </span>
        )}
      </div>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Catalogued datasets
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">{datasets.length}</p>
        </div>
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Draft datasets
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">{draftCount}</p>
        </div>
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Under review
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">{reviewCount}</p>
        </div>
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Open-access datasets
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">{openAccessCount}</p>
        </div>
      </section>
      <section className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <AnalyticsCharts />
        <div className="portal-card space-y-2 rounded-xl p-3 text-xs">
          <h2 className="font-heading text-sm font-semibold text-primary">
            Recent access requests
          </h2>
          <ul className="space-y-2 text-[11px] text-text/80">
            {requests.slice(0, 3).map((request) => (
              <li key={request.id}>
                {request.dataset} - {request.status}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-3">
        {canSubmit ? (
          <Link
            to="/portal/submit-dataset"
            className="portal-card rounded-xl p-3 text-xs hover:border-primary/40"
          >
            <p className="font-heading text-sm font-semibold text-primary">New submission</p>
            <p className="mt-1 text-text/70">Start a new dataset submission wizard.</p>
          </Link>
        ) : (
          <div className="portal-card rounded-xl p-3 text-xs">
            <p className="font-heading text-sm font-semibold text-primary">Read-only role</p>
            <p className="mt-1 text-text/70">
              Submit actions are available for contributor and Data Manager roles.
            </p>
          </div>
        )}
        <Link
          to="/portal/request-access"
          className="portal-card rounded-xl p-3 text-xs hover:border-primary/40"
        >
          <p className="font-heading text-sm font-semibold text-primary">Request access</p>
          <p className="mt-1 text-text/70">Submit a governed access application.</p>
        </Link>
        <Link
          to={canReviewMetadata ? '/portal/metadata-review' : '/portal/my-requests'}
          className="portal-card rounded-xl p-3 text-xs hover:border-primary/40"
        >
          <p className="font-heading text-sm font-semibold text-primary">
            {canReviewMetadata ? 'Metadata review' : 'Track requests'}
          </p>
          <p className="mt-1 text-text/70">
            {canReviewMetadata
              ? 'Review QA stage, governance status, and publication readiness.'
              : 'Follow DAC and governance decisions.'}
          </p>
        </Link>
      </section>
      {(submissionDraftItems.length > 0 || accessDraftItems.length > 0) && (
        <section className="portal-card rounded-xl p-3 text-xs">
          <h2 className="font-heading text-sm font-semibold text-primary">Continue your drafts</h2>
          <p className="mt-1 text-text/70">
            Saved drafts are local to this browser until you submit them.
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {submissionDraftItems.map((draft) => (
              <Link
                key={`submission-${draft.to}`}
                to={draft.to}
                className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-[11px] font-medium text-primary transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:shadow-sm"
              >
                Resume dataset draft: {draft.label}
              </Link>
            ))}
            {accessDraftItems.map((draft) => (
              <Link
                key={`access-${draft.to}`}
                to={draft.to}
                className="rounded-lg border border-secondary/20 bg-white px-3 py-2 text-[11px] font-medium text-secondary transition hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/10 hover:shadow-sm"
              >
                Resume access draft: {draft.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

