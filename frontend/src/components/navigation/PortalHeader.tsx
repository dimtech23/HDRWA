import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../hooks/AuthContext'
import { portalApi } from '../../services/api/portal'

function safeJsonParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function PortalHeader() {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions'],
    queryFn: portalApi.listSubmissions,
  })
  const { data: requests = [] } = useQuery({
    queryKey: ['access-requests'],
    queryFn: portalApi.listAccessRequests,
  })
  const pendingReviewCount = submissions.filter((item) => item.status === 'Under review').length
  const pendingAccessCount = requests.filter(
    (item) => item.status === 'DAC review' || item.status === 'Pending',
  ).length
  const releasePendingCount = requests.filter((item) => item.status === 'Approved - pending release').length

  const submissionDrafts = useMemo(() => {
    const raw = localStorage.getItem('hdrwa_dataset_submission_drafts')
    if (!raw) return [] as Array<{ datasetTitle: string; query: string }>
    const parsed = safeJsonParse<
      Array<{
        datasetId?: string
        datasetTitle?: string
        institution?: string
        topic?: string
        country?: string
        accessLevel?: 'Open' | 'Controlled' | 'Restricted'
      }>
    >(raw)
    if (!parsed || !Array.isArray(parsed)) return []
    return parsed.map((item) => {
      const params = new URLSearchParams()
      if (item.datasetId) params.set('datasetId', item.datasetId)
      if (item.datasetTitle) params.set('datasetTitle', item.datasetTitle)
      if (item.institution) params.set('institution', item.institution)
      if (item.country) params.set('country', item.country)
      if (item.topic) params.set('topic', item.topic)
      if (item.accessLevel) params.set('accessLevel', item.accessLevel)
      return { datasetTitle: item.datasetTitle || 'Untitled dataset', query: params.toString() }
    })
  }, [])

  const accessDrafts = useMemo(() => {
    const raw = localStorage.getItem('hdrwa_access_request_drafts')
    if (!raw) return [] as Array<{ datasetTitle: string; query: string }>
    const parsed = safeJsonParse<Array<{ datasetId?: string; dataset?: string }>>(raw)
    if (!parsed || !Array.isArray(parsed)) return []
    return parsed.map((item) => {
      const params = new URLSearchParams()
      if (item.datasetId) params.set('datasetId', item.datasetId)
      if (item.dataset) params.set('datasetTitle', item.dataset)
      return { datasetTitle: item.dataset || 'Untitled dataset', query: params.toString() }
    })
  }, [])

  const notificationCount =
    pendingReviewCount +
    pendingAccessCount +
    releasePendingCount +
    submissionDrafts.length +
    accessDrafts.length

  const logoSrc = `${import.meta.env.BASE_URL}hdrwa-logo.png`

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/15 bg-linear-to-r from-white/95 via-[#f5faf8]/95 to-[#eef5fb]/95 px-4 py-2 text-xs text-text shadow-[0_10px_24px_-20px_rgba(31,60,136,0.5)] backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <img
          src={logoSrc}
          alt="Health Data Research West Africa"
          className="h-9 w-auto rounded-md border border-primary/15 bg-white p-0.5 shadow-sm"
        />
        <div className="flex flex-col">
          <p className="font-heading text-sm font-semibold text-primary">HDR West Africa Portal</p>
          <p className="text-[11px] text-text/70">
            Trusted regional data-sharing platform
          </p>
        </div>
      </div>
      <div className="relative flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowNotifications((value) => !value)}
          className="rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-[11px] font-medium text-text/80 hover:bg-white"
        >
          Notifications ({notificationCount})
        </button>
        {showNotifications && (
          <div className="absolute right-0 top-10 z-20 w-[280px] rounded-xl border border-section bg-white p-3 text-[11px] shadow-lg">
            <p className="font-semibold text-primary">Notifications</p>
            <ul className="mt-2 space-y-2 text-text/80">
              {submissionDrafts.slice(0, 2).map((submissionDraft) => (
                <li key={`submission-${submissionDraft.query || submissionDraft.datasetTitle}`}>
                  Draft submission: <span className="font-semibold">{submissionDraft.datasetTitle}</span>
                  {submissionDraft.query && (
                    <>
                      {' '}
                      <Link
                        to={`/portal/submit-dataset?${submissionDraft.query}`}
                        onClick={() => setShowNotifications(false)}
                        className="font-semibold text-primary hover:underline"
                      >
                        Resume
                      </Link>
                    </>
                  )}
                </li>
              ))}
              {accessDrafts.slice(0, 2).map((accessDraft) => (
                <li key={`access-${accessDraft.query || accessDraft.datasetTitle}`}>
                  Draft access request: <span className="font-semibold">{accessDraft.datasetTitle}</span>
                  {accessDraft.query && (
                    <>
                      {' '}
                      <Link
                        to={`/portal/request-access?${accessDraft.query}`}
                        onClick={() => setShowNotifications(false)}
                        className="font-semibold text-secondary hover:underline"
                      >
                        Resume
                      </Link>
                    </>
                  )}
                </li>
              ))}
              {pendingReviewCount > 0 && (
                <li>
                  Submissions under review: <span className="font-semibold">{pendingReviewCount}</span>
                </li>
              )}
              {pendingAccessCount > 0 && (
                <li>
                  Access requests in DAC review: <span className="font-semibold">{pendingAccessCount}</span>
                </li>
              )}
              {releasePendingCount > 0 && (
                <li>
                  Approved requests pending Data Manager release:{' '}
                  <span className="font-semibold">{releasePendingCount}</span>
                </li>
              )}
              {submissionDrafts.length === 0 && accessDrafts.length === 0 && pendingReviewCount === 0 && pendingAccessCount === 0 && releasePendingCount === 0 && (
                <li className="text-text/60">No new updates right now.</li>
              )}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/portal/dashboard"
                onClick={() => setShowNotifications(false)}
                className="rounded-full border border-primary/20 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary/5"
              >
                View dashboard
              </Link>
              <Link
                to="/portal/my-submissions"
                onClick={() => setShowNotifications(false)}
                className="rounded-full border border-primary/20 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary/5"
              >
                My submissions
              </Link>
              <Link
                to="/portal/my-requests"
                onClick={() => setShowNotifications(false)}
                className="rounded-full border border-secondary/20 px-2 py-1 text-[10px] font-semibold text-secondary hover:bg-secondary/5"
              >
                My requests
              </Link>
            </div>
          </div>
        )}
        {user && (
          <div className="flex flex-col items-end">
            <span className="text-xs font-medium">{user.name}</span>
            <span className="text-[10px] capitalize text-text/60">
              {user.role === 'manager' ? 'Data Manager' : user.role}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-medium text-primary hover:bg-primary/15"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}

