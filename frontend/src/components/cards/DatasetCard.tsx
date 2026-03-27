import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'

type DatasetCardProps = {
  id: string
  title: string
  institution: string
  country: string
  topic: string
  accessLevel: 'Open' | 'Controlled' | 'Restricted'
  lastUpdated: string
}

export function DatasetCard(props: DatasetCardProps) {
  const { user } = useAuth()
  const { id, title, institution, country, topic, accessLevel, lastUpdated } = props

  const accessColor =
    accessLevel === 'Open'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : accessLevel === 'Controlled'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-rose-50 text-rose-700 border-rose-200'
  const canViewRaw = user?.role === 'manager' || user?.role === 'admin'
  const isGuest = !user
  const isResearcher = user?.role === 'researcher'
  const canSubmitDataset = user?.role === 'contributor' || user?.role === 'manager'
  const needsRequest = accessLevel !== 'Open'
  const detailsPayload = useMemo(
    () => ({
      id,
      title,
      institution,
      country,
      topic,
      accessLevel,
      lastUpdated,
    }),
    [accessLevel, country, id, institution, lastUpdated, title, topic],
  )

  return (
    <article className="flex flex-col rounded-xl border border-section bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <header className="mb-2">
        <h3 className="font-heading text-sm font-semibold text-primary">
          {title}
        </h3>
        <p className="mt-1 text-xs text-text/70">
          {institution} • {country}
        </p>
      </header>
      <p className="mb-3 mt-1 text-xs text-text/80">Topic: {topic}</p>
      <details className="mb-3 rounded-lg border border-section/80 bg-section/30 p-2 text-[11px] text-text/75">
        <summary className="cursor-pointer font-medium text-secondary/90">
          View dataset details
        </summary>
        <div className="mt-2 space-y-1">
          <p><span className="font-semibold">Dataset ID:</span> {id}</p>
          <p><span className="font-semibold">Institution:</span> {institution}</p>
          <p><span className="font-semibold">Country:</span> {country}</p>
          <p><span className="font-semibold">Access model:</span> {accessLevel}</p>
        </div>
      </details>
      {canViewRaw && (
        <details className="mb-3 rounded-lg border border-secondary/20 bg-white p-2 text-[11px]">
          <summary className="cursor-pointer font-medium text-secondary">
            View JSON (read-only)
          </summary>
          <pre className="mt-2 overflow-x-auto rounded-md bg-section/50 p-2 text-[10px] leading-5 text-text/80">
            {JSON.stringify(detailsPayload, null, 2)}
          </pre>
        </details>
      )}
      <div className="mt-auto flex items-center justify-between">
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${accessColor}`}
        >
          {accessLevel} access
        </span>
        <span className="text-[10px] text-text/60">
          Updated {new Date(lastUpdated).toLocaleDateString()}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {isGuest && needsRequest && (
          <>
            <Link
              to="/login"
              className="rounded-full border border-primary/30 bg-white px-3 py-1 text-[10px] font-semibold text-primary hover:bg-primary/5"
            >
              Login to request access
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-white hover:bg-primary/90"
            >
              Register
            </Link>
          </>
        )}
        {isGuest && !needsRequest && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
            Open dataset preview available
          </span>
        )}
        {isResearcher && needsRequest && (
          <Link
            to={`/portal/request-access?datasetTitle=${encodeURIComponent(title)}&datasetId=${encodeURIComponent(id)}`}
            className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold text-white hover:bg-secondary/90"
          >
            Request governed access
          </Link>
        )}
        {canSubmitDataset && (
          <Link
            to={`/portal/submit-dataset?datasetTitle=${encodeURIComponent(title)}&datasetId=${encodeURIComponent(id)}&institution=${encodeURIComponent(institution)}&country=${encodeURIComponent(country)}&topic=${encodeURIComponent(topic)}&accessLevel=${encodeURIComponent(accessLevel)}`}
            className="rounded-full border border-primary/30 bg-white px-3 py-1 text-[10px] font-semibold text-primary hover:bg-primary/5"
          >
            Submit related dataset
          </Link>
        )}
      </div>
    </article>
  )
}

