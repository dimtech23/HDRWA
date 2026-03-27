import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { portalApi } from '../../services/api/portal'
import { ToastMessage } from '../../components/feedback/ToastMessage'
import { useAuth } from '../../hooks/AuthContext'

const steps = [
  'Dataset summary',
  'Metadata',
  'Governance and access',
  'Review and submit',
]
type SubmissionDraft = {
  id: string
  step?: number
  datasetId?: string
  datasetTitle?: string
  institution?: string
  topic?: string
  country?: string
  accessLevel?: 'Open' | 'Controlled' | 'Restricted'
  updatedAt: string
}

export function SubmitDatasetPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [datasetTitle, setDatasetTitle] = useState('')
  const [institution, setInstitution] = useState('')
  const [topic, setTopic] = useState('Tuberculosis')
  const [country, setCountry] = useState('')
  const [accessLevel, setAccessLevel] = useState<'Open' | 'Controlled' | 'Restricted'>(
    'Controlled',
  )
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'error' } | null>(null)
  const [draftLoaded, setDraftLoaded] = useState(false)
  const canSubmit = user?.role === 'contributor' || user?.role === 'manager'
  const isDataManager = user?.role === 'manager'
  const [managerChecklistAccepted, setManagerChecklistAccepted] = useState(false)

  const draftStorageKey = useMemo(() => 'hdrwa_dataset_submission_drafts', [])
  const readDrafts = (): SubmissionDraft[] => {
    try {
      const rawList = localStorage.getItem(draftStorageKey)
      if (rawList) {
        const parsed = JSON.parse(rawList) as SubmissionDraft[]
        if (Array.isArray(parsed)) return parsed
      }
      const legacyRaw = localStorage.getItem('hdrwa_dataset_submission_draft')
      if (!legacyRaw) return []
      const legacy = JSON.parse(legacyRaw) as Omit<SubmissionDraft, 'id' | 'updatedAt'>
      if (!legacy.datasetTitle && !legacy.institution) return []
      return [
        {
          id: legacy.datasetId || legacy.datasetTitle || 'legacy-submission-draft',
          ...legacy,
          updatedAt: new Date().toISOString(),
        },
      ]
    } catch {
      return []
    }
  }

  const writeDrafts = (drafts: SubmissionDraft[]) => {
    localStorage.setItem(draftStorageKey, JSON.stringify(drafts))
  }

  const datasetTitleFromQuery = searchParams.get('datasetTitle')
  const datasetIdFromQuery = searchParams.get('datasetId')
  const institutionFromQuery = searchParams.get('institution')
  const countryFromQuery = searchParams.get('country')
  const topicFromQuery = searchParams.get('topic')
  const accessLevelFromQuery = searchParams.get('accessLevel')

  useEffect(() => {
    if (draftLoaded) return
    if (datasetTitleFromQuery) setDatasetTitle(datasetTitleFromQuery)
    if (institutionFromQuery) setInstitution(institutionFromQuery)
    if (countryFromQuery) setCountry(countryFromQuery)
    if (topicFromQuery) setTopic(topicFromQuery)
    if (
      accessLevelFromQuery === 'Open' ||
      accessLevelFromQuery === 'Controlled' ||
      accessLevelFromQuery === 'Restricted'
    ) {
      setAccessLevel(accessLevelFromQuery)
    }
  }, [
    accessLevelFromQuery,
    countryFromQuery,
    datasetTitleFromQuery,
    datasetIdFromQuery,
    draftLoaded,
    institutionFromQuery,
    topicFromQuery,
  ])

  useEffect(() => {
    try {
      const drafts = readDrafts()
      if (drafts.length === 0) return

      const matchedDraft =
        drafts.find((draft) => {
          const matchesByDatasetId =
            datasetIdFromQuery && draft.datasetId ? draft.datasetId === datasetIdFromQuery : false
          const matchesByDatasetTitle =
            datasetTitleFromQuery && draft.datasetTitle
              ? draft.datasetTitle === datasetTitleFromQuery
              : false
          return matchesByDatasetId || matchesByDatasetTitle
        }) || null

      const shouldRestore =
        datasetIdFromQuery || datasetTitleFromQuery
          ? Boolean(matchedDraft)
          : true

      if (!shouldRestore) return
      const parsed = matchedDraft ?? drafts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
      if (!parsed) return

      if (typeof parsed.step === 'number') setStep(parsed.step)
      if (parsed.datasetTitle) setDatasetTitle(parsed.datasetTitle)
      if (parsed.institution) setInstitution(parsed.institution)
      if (parsed.country) setCountry(parsed.country)
      if (parsed.topic) setTopic(parsed.topic)
      if (
        parsed.accessLevel === 'Open' ||
        parsed.accessLevel === 'Controlled' ||
        parsed.accessLevel === 'Restricted'
      ) {
        setAccessLevel(parsed.accessLevel)
      }
      setDraftLoaded(true)
    } catch {}
  }, [draftStorageKey, datasetIdFromQuery, datasetTitleFromQuery])

  const saveDraftLocally = () => {
    try {
      const draftId = datasetIdFromQuery || datasetTitle || `draft-${Date.now()}`
      const draftEntry: SubmissionDraft = {
        id: draftId,
        step,
        datasetId: datasetIdFromQuery || undefined,
        datasetTitle,
        institution,
        topic,
        country,
        accessLevel,
        updatedAt: new Date().toISOString(),
      }
      const existing = readDrafts()
      const next = [draftEntry, ...existing.filter((item) => item.id !== draftId)]
      writeDrafts(next)
      setDraftLoaded(true)
      setToast({ text: 'Draft saved. Continue when ready.', tone: 'success' })
    } catch {
      setToast({ text: 'Unable to save draft locally.', tone: 'error' })
    }
  }

  const createSubmissionMutation = useMutation({
    mutationFn: portalApi.createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] })
      queryClient.invalidateQueries({ queryKey: ['datasets'] })
      setToast({ text: 'Dataset submission saved.', tone: 'success' })
      const draftId = datasetIdFromQuery || datasetTitle
      const existing = readDrafts()
      const next = draftId ? existing.filter((item) => item.id !== draftId) : existing.slice(1)
      writeDrafts(next)
      localStorage.removeItem('hdrwa_dataset_submission_draft')
      navigate('/portal/my-submissions')
    },
    onError: () => setToast({ text: 'Unable to save submission.', tone: 'error' }),
  })

  return (
    <div className="space-y-4">
      {!canSubmit && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Your role has read-only dataset access. Submission is available for contributor and Data Manager roles.
        </div>
      )}
      <header className="mx-auto max-w-6xl">
        <h1 className="font-heading text-xl font-semibold text-primary">
          Submit dataset
        </h1>
        <p className="mt-1 text-xs text-text/80">
          Multi-step submission flow with governance-ready structure.
        </p>
      </header>

      <ol className="mx-auto flex max-w-6xl flex-wrap gap-2 text-[11px]">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`flex min-w-[150px] flex-1 items-center gap-2 rounded-xl border px-3 py-2 ${
              index === step
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-section bg-white text-text/70'
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
              {index + 1}
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ol>

      <form className="portal-card mx-auto max-w-6xl space-y-4 rounded-xl p-4 text-xs lg:p-5">
        {toast && (
          <ToastMessage text={toast.text} tone={toast.tone} onClose={() => setToast(null)} />
        )}
        {step === 0 && (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Dataset title
                </span>
                <input
                  value={datasetTitle}
                  onChange={(event) => setDatasetTitle(event.target.value)}
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                  placeholder="Example: Longitudinal TB Cohort Data – Lagos and Accra"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Institution
                </span>
                <input
                  value={institution}
                  onChange={(event) => setInstitution(event.target.value)}
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Abstract
              </span>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="Short description of the dataset, population, design, and key variables."
              />
            </label>
          </>
        )}
        {step === 1 && (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Topic
                </span>
                <select
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="w-full rounded-lg border border-section bg-white px-3 py-2 text-xs"
                >
                  <option>Tuberculosis</option>
                  <option>Malaria</option>
                  <option>HIV</option>
                  <option>Public health</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Country
                </span>
                <input
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Keywords
                </span>
                <input
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                  placeholder="Comma-separated terms"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Variable dictionary reference
              </span>
              <input
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="Link or internal file reference"
              />
            </label>
          </>
        )}
        {step === 2 && (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Access level
                </span>
                <select
                  value={accessLevel}
                  onChange={(event) => setAccessLevel(event.target.value as 'Open' | 'Controlled' | 'Restricted')}
                  className="w-full rounded-lg border border-section bg-white px-3 py-2 text-xs"
                >
                  <option>Open</option>
                  <option>Controlled</option>
                  <option>Restricted</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Ethics approval reference
                </span>
                <input
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                  placeholder="IRB/REC reference ID"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Governance notes
              </span>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="Describe data access conditions, governance body, and ethics approvals."
              />
            </label>
            {isDataManager && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="text-[11px] font-semibold text-primary">
                  Data Manager verification checklist (required)
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] text-text/80">
                  <li>Metadata fields are complete and consistent with the submission form.</li>
                  <li>Variable dictionary and coding schema are reviewed for quality.</li>
                  <li>Access level and governance conditions are correct for this dataset.</li>
                  <li>Contributor has read and accepted the Data Governance / Data Use Agreement.</li>
                </ul>
                <label className="mt-2 flex items-start gap-2 text-[11px] text-text/85">
                  <input
                    type="checkbox"
                    checked={managerChecklistAccepted}
                    onChange={(event) => setManagerChecklistAccepted(event.target.checked)}
                    className="mt-0.5"
                  />
                  I confirm the checklist has been completed for this dataset.
                </label>
              </div>
            )}
          </>
        )}
        {step === 3 && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-text/80">
            Review your entries before submitting. QA and governance teams receive this package for review and publication preparation.
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-section pt-3">
          <button
            type="button"
            disabled={!canSubmit}
            className="rounded-full border border-section px-4 py-1.5 text-[11px] font-medium text-text hover:bg-section/60 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={saveDraftLocally}
          >
            Save draft
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="rounded-full border border-section px-4 py-1.5 text-[11px] font-medium text-text hover:bg-section/60"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                className="rounded-full bg-primary px-4 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-primary/90"
              >
                Next
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="button"
                disabled={!canSubmit || (isDataManager && !managerChecklistAccepted)}
                onClick={() =>
                  createSubmissionMutation.mutate({
                    title: datasetTitle || 'Untitled dataset',
                    institution: institution || 'Unknown institution',
                    country: country || 'Unspecified',
                    topic,
                    accessLevel,
                  })
                }
                className="rounded-full bg-secondary px-4 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit for review
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

