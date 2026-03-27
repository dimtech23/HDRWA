import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { portalApi } from '../../services/api/portal'
import { ToastMessage } from '../../components/feedback/ToastMessage'
import { useAuth } from '../../hooks/AuthContext'

const steps = ['Dataset and purpose', 'Governance details', 'Review']
type AccessDraft = {
  id: string
  datasetId?: string
  step?: number
  dataset?: string
  purpose?: string
  updatedAt: string
}

export function RequestAccessPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [dataset, setDataset] = useState('')
  const [purpose, setPurpose] = useState('')
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'error' } | null>(null)
  const [draftLoaded, setDraftLoaded] = useState(false)

  const datasetTitleFromQuery = searchParams.get('datasetTitle')
  const datasetIdFromQuery = searchParams.get('datasetId')
  const draftStorageKey = useMemo(() => 'hdrwa_access_request_drafts', [])

  const readDrafts = (): AccessDraft[] => {
    try {
      const rawList = localStorage.getItem(draftStorageKey)
      if (rawList) {
        const parsed = JSON.parse(rawList) as AccessDraft[]
        if (Array.isArray(parsed)) return parsed
      }
      const legacyRaw = localStorage.getItem('hdrwa_access_request_draft')
      if (!legacyRaw) return []
      const legacy = JSON.parse(legacyRaw) as {
        datasetId?: string
        step?: number
        dataset?: string
        purpose?: string
      }
      if (!legacy.dataset && !legacy.purpose) return []
      return [
        {
          id: legacy.datasetId || legacy.dataset || 'legacy-access-draft',
          datasetId: legacy.datasetId,
          step: legacy.step,
          dataset: legacy.dataset,
          purpose: legacy.purpose,
          updatedAt: new Date().toISOString(),
        },
      ]
    } catch {
      return []
    }
  }

  const writeDrafts = (drafts: AccessDraft[]) => {
    localStorage.setItem(draftStorageKey, JSON.stringify(drafts))
  }

  useEffect(() => {
    if (datasetTitleFromQuery && !draftLoaded) {
      setDataset(datasetTitleFromQuery)
    }
  }, [datasetTitleFromQuery, draftLoaded])

  useEffect(() => {
    try {
      const drafts = readDrafts()
      if (drafts.length === 0) return

      const matchedDraft =
        drafts.find((draft) => {
          const matchesByDatasetId =
            datasetIdFromQuery && draft.datasetId ? draft.datasetId === datasetIdFromQuery : false
          const matchesByDatasetTitle =
            datasetTitleFromQuery && draft.dataset
              ? draft.dataset === datasetTitleFromQuery
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
      if (parsed.dataset) setDataset(parsed.dataset)
      if (parsed.purpose) setPurpose(parsed.purpose)
      setDraftLoaded(true)
    } catch {}
  }, [datasetIdFromQuery, datasetTitleFromQuery, draftStorageKey])

  const saveDraftLocally = () => {
    try {
      const draftId = datasetIdFromQuery || dataset || `draft-${Date.now()}`
      const draftEntry: AccessDraft = {
        id: draftId,
        datasetId: datasetIdFromQuery || undefined,
        step,
        dataset,
        purpose,
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

  const createAccessRequestMutation = useMutation({
    mutationFn: portalApi.createAccessRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['access-requests'] })
      setToast({ text: 'Access request submitted.', tone: 'success' })
      const draftId = datasetIdFromQuery || dataset
      const existing = readDrafts()
      const next = draftId ? existing.filter((item) => item.id !== draftId) : existing.slice(1)
      writeDrafts(next)
      localStorage.removeItem('hdrwa_access_request_draft')
      navigate('/portal/my-requests')
    },
    onError: () => setToast({ text: 'Unable to submit request.', tone: 'error' }),
  })

  return (
    <div className="space-y-4">
      <header className="mx-auto max-w-6xl">
        <h1 className="font-heading text-xl font-semibold text-primary">
          Request dataset access
        </h1>
        <p className="mt-1 text-xs text-text/80">
          Submit a governance-ready access request with clear, staged inputs.
        </p>
        <p className="mt-1 text-[11px] text-text/70">
          Access requests are reviewed by the Data Access Committee (DAC). Data Managers and DAC members receive notifications.
        </p>
        <p className="mt-1 text-[11px] text-text/70">
          You submit your request to the platform. The Data Access Guideline is available to view when needed. The full Data Use Agreement is issued after DAC approval and must be signed before data release.
        </p>
        <div className="mt-2 rounded-lg border border-secondary/20 bg-secondary/5 px-3 py-2 text-[11px] text-text/80">
          {user?.role === 'researcher'
            ? 'As a Researcher: submit your request package in the system and monitor DAC review status in My requests.'
            : user?.role === 'manager'
              ? 'As a Data Manager: monitor DAC decisions and complete release only after Data Use Agreement and required conditions are satisfied.'
              : 'Next step: complete this request in the system; DAC review and release steps happen after submission.'}
        </div>
      </header>

      <ol className="mx-auto flex max-w-6xl flex-wrap gap-2 text-[11px]">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`flex min-w-[140px] flex-1 items-center gap-2 rounded-xl border px-3 py-2 ${
              index === step
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-section bg-white text-text/70'
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
              {index + 1}
            </span>
            {label}
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
              <label className="block md:col-span-2">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Target dataset
                </span>
                <input
                  value={dataset}
                  onChange={(event) => setDataset(event.target.value)}
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                  placeholder="Dataset name or ID"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Requested duration
                </span>
                <select className="w-full rounded-lg border border-section bg-white px-3 py-2 text-xs">
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>24 months</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Data access type
                </span>
                <select className="w-full rounded-lg border border-section bg-white px-3 py-2 text-xs">
                  <option>De-identified row-level</option>
                  <option>Aggregate extracts</option>
                  <option>Remote secure environment</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Research purpose
              </span>
              <textarea
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                rows={4}
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="Describe your research question, design, and expected outputs."
              />
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Ethics approval reference
                </span>
                <input
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                  placeholder="Protocol number or reference"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Institution data security contact
                </span>
                <input
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                  placeholder="Name and email"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-1 block text-[11px] font-medium text-text/80">
                  Governance statement
                </span>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                  placeholder="Describe compliance approach, storage controls, and data handling."
                />
              </label>
            </div>
            <div className="rounded-lg border border-section bg-section/30 p-3 text-[11px] text-text/80">
              <p className="font-semibold text-primary">Document timing</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>Data Access Guideline: optional reference document, view any time when needed.</li>
                <li>Data Use Agreement: compulsory after DAC approval, before any data release.</li>
              </ul>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-text/80">
            Confirm the request package and submit it to the HDRWA platform.
            The platform then routes the request through Data Access Committee (DAC) review.
            After DAC review, the requester and Data Manager are updated. If approved and all agreement conditions are met, the Data Manager can release data access.
            Data sharing itself happens outside this system via a secure channel.
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-section pt-3">
          <button
            type="button"
            className="rounded-full border border-section px-4 py-1.5 text-[11px] font-medium text-text hover:bg-section/60"
            onClick={saveDraftLocally}
          >
            Save draft
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                className="rounded-full border border-section px-4 py-1.5 text-[11px] font-medium text-text hover:bg-section/60"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}
                className="rounded-full bg-primary px-4 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-primary/90"
              >
                Next
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="button"
                onClick={() =>
                  createAccessRequestMutation.mutate({
                    dataset: dataset || 'Unspecified dataset',
                    purpose: purpose || 'No purpose provided',
                  })
                }
                className="rounded-full bg-secondary px-4 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-secondary/90"
              >
                Submit request
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

