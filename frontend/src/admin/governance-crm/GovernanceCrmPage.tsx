import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ContentChannel, ContentStatus, DatasetOperation } from '../data/governanceCrm'
import { governanceApi } from '../../services/api/governance'
import { adminApi } from '../../services/api/admin'
import { partnersApi, type PartnerKind } from '../../services/api/partners'
import { ToastMessage } from '../../components/feedback/ToastMessage'
import { teamMembers } from '../../data/team'
import { steeringMembers } from '../../data/steeringCommittee'
import { dataAccessMembers } from '../../data/dataAccessCommittee'

const contentStatusStyles: Record<ContentStatus, string> = {
  Draft: 'bg-slate-100 text-slate-700',
  'In review': 'bg-blue-100 text-blue-700',
  Scheduled: 'bg-amber-100 text-amber-700',
  Published: 'bg-emerald-100 text-emerald-700',
}

const datasetStageStyles: Record<DatasetOperation['stage'], string> = {
  'Metadata QA': 'bg-slate-100 text-slate-700',
  'Governance review': 'bg-blue-100 text-blue-700',
  'Publication prep': 'bg-amber-100 text-amber-700',
  Live: 'bg-emerald-100 text-emerald-700',
}

const datasetQaStatusStyles: Record<DatasetOperation['qaStatus'], string> = {
  Blocked: 'bg-rose-100 text-rose-700',
  'In progress': 'bg-amber-100 text-amber-700',
  Complete: 'bg-emerald-100 text-emerald-700',
}

const channelOptions: ContentChannel[] = [
  'Website page',
  'Dataset record',
  'Resource library',
]

export function GovernanceCrmPage() {
  const queryClient = useQueryClient()
  const [query, setQuery] = useState('')
  const [selectedChannel, setSelectedChannel] = useState<ContentChannel | 'All'>('All')
  const [selectedStatus, setSelectedStatus] = useState<ContentStatus | 'All'>('All')
  const [newContentTitle, setNewContentTitle] = useState('')
  const [newContentOwner, setNewContentOwner] = useState('')
  const [newContentChannel, setNewContentChannel] = useState<ContentChannel>('Website page')
  const [newDatasetName, setNewDatasetName] = useState('')
  const [newDatasetInstitution, setNewDatasetInstitution] = useState('')
  const [newDatasetCountry, setNewDatasetCountry] = useState('')
  const [newDatasetTopic, setNewDatasetTopic] = useState('Public health')
  const [newDatasetAccessLevel, setNewDatasetAccessLevel] = useState<DatasetOperation['accessLevel']>('Controlled')

  const [opDrafts, setOpDrafts] = useState<
    Record<
      string,
      { stage: DatasetOperation['stage']; qaStatus: DatasetOperation['qaStatus']; nextAction: string }
    >
  >({})

  const [newPartnerName, setNewPartnerName] = useState('')
  const [newPartnerUrl, setNewPartnerUrl] = useState('')
  const [newPartnerLogoPath, setNewPartnerLogoPath] = useState('')
  const [newPartnerKind, setNewPartnerKind] = useState<PartnerKind>('Partner')
  const [newPartnerDisplayOrder, setNewPartnerDisplayOrder] = useState('')
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'error' | 'info' } | null>(null)

  const { data: contentUpdates = [] } = useQuery({
    queryKey: ['content-updates'],
    queryFn: governanceApi.listContentUpdates,
  })
  const { data: datasetOperations = [] } = useQuery({
    queryKey: ['dataset-operations'],
    queryFn: governanceApi.listDatasetOperations,
  })
  const { data: siteSectionHealth = [] } = useQuery({
    queryKey: ['site-section-health'],
    queryFn: governanceApi.listSiteHealth,
  })
  const { data: governanceRisks = [] } = useQuery({
    queryKey: ['governance-risks'],
    queryFn: governanceApi.listRisks,
  })
  const { data: governanceContacts = [] } = useQuery({
    queryKey: ['governance-contacts'],
    queryFn: governanceApi.listContacts,
  })

  const { data: partnersDonors = [] } = useQuery({
    queryKey: ['partners-donors'],
    queryFn: partnersApi.listPartnersDonors,
  })

  const createContentMutation = useMutation({
    mutationFn: governanceApi.createContentUpdate,
    onSuccess: () => {
      setNewContentTitle('')
      setNewContentOwner('')
      queryClient.invalidateQueries({ queryKey: ['content-updates'] })
      setToast({ text: 'Content update saved.', tone: 'success' })
    },
    onError: () => setToast({ text: 'Unable to save content update.', tone: 'error' }),
  })
  const updateContentStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContentStatus }) =>
      governanceApi.patchContentUpdateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-updates'] })
      setToast({ text: 'Content status updated.', tone: 'success' })
    },
    onError: () => setToast({ text: 'Unable to update content status.', tone: 'error' }),
  })
  const createDatasetMutation = useMutation({
    mutationFn: governanceApi.createDatasetOperation,
    onSuccess: () => {
      setNewDatasetName('')
      setNewDatasetInstitution('')
      setNewDatasetCountry('')
      setNewDatasetTopic('Public health')
      setNewDatasetAccessLevel('Controlled')
      queryClient.invalidateQueries({ queryKey: ['dataset-operations'] })
      setToast({ text: 'Dataset operation saved.', tone: 'success' })
    },
    onError: () => setToast({ text: 'Unable to save dataset operation.', tone: 'error' }),
  })

  const updateDatasetOpMutation = useMutation({
    mutationFn: ({
      id,
      stage,
      qaStatus,
      nextAction,
    }: {
      id: string
      stage: DatasetOperation['stage']
      qaStatus: DatasetOperation['qaStatus']
      nextAction: string
    }) =>
      governanceApi.patchDatasetOperation(id, {
        stage,
        qaStatus,
        nextAction,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataset-operations'] })
      setToast({ text: 'Dataset operation updated.', tone: 'success' })
    },
    onError: () => setToast({ text: 'Unable to update dataset operation.', tone: 'error' }),
  })

  const createPartnerDonorMutation = useMutation({
    mutationFn: partnersApi.createPartnerDonor,
    onSuccess: () => {
      setNewPartnerName('')
      setNewPartnerUrl('')
      setNewPartnerLogoPath('')
      setNewPartnerKind('Partner')
      setNewPartnerDisplayOrder('')
      queryClient.invalidateQueries({ queryKey: ['partners-donors'] })
      setToast({ text: 'Partner/donor added.', tone: 'success' })
    },
    onError: () => setToast({ text: 'Unable to add partner/donor.', tone: 'error' }),
  })

  const resetDemoMutation = useMutation({
    mutationFn: adminApi.resetDemoData,
    onSuccess: () => {
      queryClient.invalidateQueries()
      setToast({ text: 'Demo data reset successfully.', tone: 'success' })
    },
    onError: () => setToast({ text: 'Demo data reset failed.', tone: 'error' }),
  })

  const filteredContentUpdates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return contentUpdates.filter((update) => {
      const matchChannel = selectedChannel === 'All' || update.channel === selectedChannel
      const matchStatus = selectedStatus === 'All' || update.status === selectedStatus
      const matchSearch =
        !normalizedQuery ||
        update.title.toLowerCase().includes(normalizedQuery) ||
        update.owner.toLowerCase().includes(normalizedQuery) ||
        update.id.toLowerCase().includes(normalizedQuery)
      return matchChannel && matchStatus && matchSearch
    })
  }, [query, selectedChannel, selectedStatus])

  const summary = useMemo(() => {
    const pendingContentActions = contentUpdates.filter(
      (update) => update.status === 'Draft' || update.status === 'In review',
    ).length
    const activeDatasets = datasetOperations.filter((entry) => entry.stage !== 'Live').length
    const highRiskItems = governanceRisks.filter((risk) => risk.severity === 'High').length
    const sectionsNeedReview = siteSectionHealth.filter(
      (section) => section.status === 'Needs review',
    ).length
    return {
      pendingContentActions,
      activeDatasets,
      engagedContacts: governanceContacts.filter(
        (contact) => contact.engagementStage === 'Active',
      ).length,
      sectionsNeedReview,
      highRiskItems,
    }
  }, [])

  const publishingPipeline = useMemo(() => {
    const order: ContentStatus[] = ['Draft', 'In review', 'Scheduled', 'Published']
    return order.map((status) => ({
      status,
      count: contentUpdates.filter((update) => update.status === status).length,
    }))
  }, [])

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-xl font-semibold text-primary">
            Governance CRM
          </h1>
          <p className="mt-1 text-xs text-text/80">
            Manage website content, dataset publishing, and governance quality from one workspace.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] text-primary">
          Last updated: 23 Mar 2026
        </div>
      </header>
      {toast && (
        <ToastMessage
          text={toast.text}
          tone={toast.tone}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            const confirmed = window.confirm(
              'Reset demo data? This will clear test records and reseed base demo content.',
            )
            if (confirmed) {
              resetDemoMutation.mutate()
            }
          }}
          className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-100"
        >
          Reset demo data
        </button>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Pending content actions" value={summary.pendingContentActions} />
        <MetricCard label="Datasets in active workflow" value={summary.activeDatasets} />
        <MetricCard label="Active governance contacts" value={summary.engagedContacts} />
        <MetricCard label="Site sections needing review" value={summary.sectionsNeedReview} />
      </section>

      <section className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="portal-card space-y-3 rounded-xl p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-sm font-semibold text-primary">
              Website and catalogue content queue
            </h2>
            <div className="flex flex-wrap gap-2">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ID, title, owner..."
                className="w-48 rounded-md border border-section px-2 py-1 text-xs outline-none focus:border-primary"
              />
              <select
                value={selectedChannel}
                onChange={(event) => setSelectedChannel(event.target.value as ContentChannel | 'All')}
                className="rounded-md border border-section px-2 py-1 text-xs outline-none focus:border-primary"
              >
                <option value="All">All channels</option>
                {channelOptions.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value as ContentStatus | 'All')}
                className="rounded-md border border-section px-2 py-1 text-xs outline-none focus:border-primary"
              >
                <option value="All">All statuses</option>
                {(['Draft', 'In review', 'Scheduled', 'Published'] as ContentStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-[-6px] text-[11px] text-text/70">
            Phase 1: this queue tracks review & publishing readiness for website pages,
            dataset records, and resources. It records workflow status (Draft → Live),
            but does not edit the actual page text/content yet.
          </p>

          <div className="grid gap-2 rounded-lg border border-section/80 bg-section/35 p-2 md:grid-cols-[minmax(0,1fr)_160px_140px_auto]">
            <input
              value={newContentTitle}
              onChange={(event) => setNewContentTitle(event.target.value)}
              placeholder="New content update title"
              className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            />
            <input
              value={newContentOwner}
              onChange={(event) => setNewContentOwner(event.target.value)}
              placeholder="Owner team"
              className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            />
            <select
              value={newContentChannel}
              onChange={(event) => setNewContentChannel(event.target.value as ContentChannel)}
              className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            >
              {channelOptions.map((channel) => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() =>
                createContentMutation.mutate({
                  title: newContentTitle,
                  channel: newContentChannel,
                  owner: newContentOwner || 'Admin',
                  lastEdited: new Date().toISOString().slice(0, 10),
                  status: 'Draft',
                  priority: 'Medium',
                })
              }
              disabled={!newContentTitle.trim()}
              className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
            >
              Save content
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-section">
            <table className="min-w-full border-collapse text-xs">
              <thead className="bg-section/70 text-[11px] uppercase tracking-wide text-text/70">
                <tr>
                  <th className="px-3 py-2 text-left">Content update</th>
                  <th className="px-3 py-2 text-left">Channel</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Priority</th>
                  <th className="px-3 py-2 text-left">Last edited</th>
                </tr>
              </thead>
              <tbody>
                {filteredContentUpdates.map((update) => (
                  <tr key={update.id} className="border-t border-section/80">
                    <td className="px-3 py-2">
                      <div className="font-medium">{update.title}</div>
                      <div className="text-[11px] text-text/60">
                        {update.id} - {update.owner}
                      </div>
                    </td>
                    <td className="px-3 py-2">{update.channel}</td>
                    <td className="px-3 py-2">
                      <select
                        value={update.status}
                        onChange={(event) =>
                          updateContentStatusMutation.mutate({
                            id: update.id,
                            status: event.target.value as ContentStatus,
                          })
                        }
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${contentStatusStyles[update.status]}`}
                      >
                        <option value="Draft">Draft</option>
                        <option value="In review">In review</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Published">Published</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">{update.priority}</td>
                    <td className="px-3 py-2">{update.lastEdited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <div className="portal-card rounded-xl p-3">
            <h2 className="font-heading text-sm font-semibold text-primary">
              Publishing stage distribution
            </h2>
            <ul className="mt-2 space-y-2 text-xs">
              {publishingPipeline.map((stage) => (
                <li key={stage.status} className="flex items-center justify-between rounded-lg bg-section/50 px-2 py-1.5">
                  <span>{stage.status}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {stage.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="portal-card rounded-xl p-3">
            <h2 className="font-heading text-sm font-semibold text-primary">
              Governance risk register
            </h2>
            <ul className="mt-2 space-y-2 text-xs">
              {governanceRisks.map((risk) => (
                <li key={risk.id} className="rounded-lg border border-section/80 p-2">
                  <p className="font-medium">{risk.title}</p>
                  <p className="text-[11px] text-text/65">
                    {risk.area} - {risk.severity} severity - owner: {risk.owner}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <div className="portal-card rounded-xl p-3">
          <h2 className="font-heading text-sm font-semibold text-primary">
            Dataset publishing operations
          </h2>
          <p className="mt-1 text-[11px] text-text/70">
            Data Managers maintain dataset workflow records and confirm checklist verification before publication readiness.
          </p>
          <div className="mt-2 flex flex-wrap gap-2 rounded-lg border border-section/80 bg-section/35 p-2">
            <input
              value={newDatasetName}
              onChange={(event) => setNewDatasetName(event.target.value)}
              placeholder="Dataset title"
              className="min-w-52 flex-1 rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            />

            <input
              value={newDatasetInstitution}
              onChange={(event) => setNewDatasetInstitution(event.target.value)}
              placeholder="Institution"
              className="min-w-48 flex-1 rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            />

            <input
              value={newDatasetCountry}
              onChange={(event) => setNewDatasetCountry(event.target.value)}
              placeholder="Country"
              className="min-w-36 flex-1 rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            />

            <input
              value={newDatasetTopic}
              onChange={(event) => setNewDatasetTopic(event.target.value)}
              placeholder="Topic (theme)"
              className="min-w-40 flex-1 rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            />

            <select
              value={newDatasetAccessLevel}
              onChange={(event) => setNewDatasetAccessLevel(event.target.value as DatasetOperation['accessLevel'])}
              className="min-w-36 flex-1 rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
            >
              {(['Open', 'Controlled', 'Restricted'] as DatasetOperation['accessLevel'][]).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                createDatasetMutation.mutate({
                  dataset: newDatasetName,
                  institution: newDatasetInstitution,
                  country: newDatasetCountry,
                  topic: newDatasetTopic,
                  stage: 'Metadata QA',
                  qaStatus: 'In progress',
                  accessLevel: newDatasetAccessLevel,
                  nextAction: 'Complete Data Manager verification checklist',
                } as Omit<DatasetOperation, 'id'>)
              }
              disabled={!newDatasetName.trim()}
              className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
            >
              Save dataset op
            </button>
          </div>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead className="bg-section/70 text-[11px] uppercase tracking-wide text-text/70">
                <tr>
                  <th className="px-3 py-2 text-left">Dataset</th>
                  <th className="px-3 py-2 text-left">Access</th>
                  <th className="px-3 py-2 text-left">Stage</th>
                  <th className="px-3 py-2 text-left">QA</th>
                  <th className="px-3 py-2 text-left">Next action</th>
                  <th className="px-3 py-2 text-left">Save</th>
                </tr>
              </thead>
              <tbody>
                {datasetOperations.map((entry) => {
                  const draft =
                    opDrafts[entry.id] ?? {
                      stage: entry.stage,
                      qaStatus: entry.qaStatus,
                      nextAction: entry.nextAction,
                    }

                  const accessBadge =
                    entry.accessLevel === 'Open'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : entry.accessLevel === 'Controlled'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'

                  return (
                    <tr key={entry.id} className="border-t border-section/80">
                      <td className="px-3 py-2">
                        <div className="font-medium text-text/90">{entry.dataset}</div>
                        <div className="text-[11px] text-text/65">{entry.id}</div>
                        {(entry.institution || entry.country) && (
                          <div className="text-[11px] text-text/65">
                            {entry.institution || '—'} • {entry.country || '—'}
                          </div>
                        )}
                        {entry.topic && (
                          <div className="text-[11px] text-text/65">Topic: {entry.topic}</div>
                        )}
                      </td>

                      <td className="px-3 py-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${accessBadge}`}
                        >
                          {entry.accessLevel}
                        </span>
                      </td>

                      <td className="px-3 py-2">
                        <select
                          value={draft.stage}
                          onChange={(event) =>
                            setOpDrafts((prev) => ({
                              ...prev,
                              [entry.id]: {
                                ...draft,
                                stage: event.target.value as DatasetOperation['stage'],
                              },
                            }))
                          }
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${datasetStageStyles[draft.stage]}`}
                        >
                          <option value="Metadata QA">Metadata QA</option>
                          <option value="Governance review">Governance review</option>
                          <option value="Publication prep">Publication prep</option>
                          <option value="Live">Live</option>
                        </select>
                      </td>

                      <td className="px-3 py-2">
                        <select
                          value={draft.qaStatus}
                          onChange={(event) =>
                            setOpDrafts((prev) => ({
                              ...prev,
                              [entry.id]: {
                                ...draft,
                                qaStatus: event.target.value as DatasetOperation['qaStatus'],
                              },
                            }))
                          }
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${datasetQaStatusStyles[draft.qaStatus]}`}
                        >
                          <option value="Blocked">Blocked</option>
                          <option value="In progress">In progress</option>
                          <option value="Complete">Complete</option>
                        </select>
                      </td>

                      <td className="px-3 py-2">
                        <input
                          value={draft.nextAction}
                          onChange={(event) =>
                            setOpDrafts((prev) => ({
                              ...prev,
                              [entry.id]: { ...draft, nextAction: event.target.value },
                            }))
                          }
                          className="w-full rounded-md border border-section bg-white px-2 py-1 text-[11px] outline-none focus:border-primary"
                        />
                      </td>

                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateDatasetOpMutation.mutate({
                              id: entry.id,
                              stage: draft.stage,
                              qaStatus: draft.qaStatus,
                              nextAction: draft.nextAction,
                            })
                          }
                          disabled={updateDatasetOpMutation.isPending}
                          className="rounded-md bg-primary px-3 py-1 text-[11px] font-medium text-white disabled:opacity-50"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="portal-card rounded-xl p-3">
          <h2 className="font-heading text-sm font-semibold text-primary">
            Website section health
          </h2>
          <ul className="mt-2 space-y-2 text-xs">
            {siteSectionHealth.map((section) => (
              <li key={section.section} className="rounded-lg border border-section/80 p-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{section.section}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      section.status === 'Healthy'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {section.status}
                  </span>
                </div>
                <p className="text-[11px] text-text/65">
                  {section.records} records - owner: {section.owner} - last publish: {section.lastPublished}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="portal-card rounded-xl p-3">
        <h2 className="font-heading text-sm font-semibold text-primary">
          Stakeholder relationship tracker
        </h2>
        <div className="mt-2 overflow-x-auto">
          <table className="min-w-full border-collapse text-xs">
            <thead className="bg-section/70 text-[11px] uppercase tracking-wide text-text/70">
              <tr>
                <th className="px-3 py-2 text-left">Contact</th>
                <th className="px-3 py-2 text-left">Segment</th>
                <th className="px-3 py-2 text-left">Owner</th>
                <th className="px-3 py-2 text-left">Stage</th>
                <th className="px-3 py-2 text-left">Last engagement</th>
              </tr>
            </thead>
            <tbody>
              {governanceContacts.map((contact) => (
                <tr key={contact.id} className="border-t border-section/80">
                  <td className="px-3 py-2">
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-[11px] text-text/65">
                      {contact.organisation} - {contact.country}
                    </div>
                  </td>
                  <td className="px-3 py-2">{contact.segment}</td>
                  <td className="px-3 py-2">{contact.owner}</td>
                  <td className="px-3 py-2">{contact.engagementStage}</td>
                  <td className="px-3 py-2">{contact.lastEngagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <details open className="portal-card rounded-xl p-3">
        <summary className="list-none cursor-pointer">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-sm font-semibold text-primary">
              Partners & donors gallery
            </h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              {partnersDonors.length} items
            </span>
          </div>
        </summary>

        <p className="mt-2 text-[11px] text-text/80">
          Add items that will appear on the public “Partners and donors” page.
        </p>

        <div className="mt-3 grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <input
            value={newPartnerName}
            onChange={(event) => setNewPartnerName(event.target.value)}
            placeholder="Name (e.g. WANETAM)"
            className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
          />
          <input
            value={newPartnerUrl}
            onChange={(event) => setNewPartnerUrl(event.target.value)}
            placeholder="Website URL"
            className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
          />
          <select
            value={newPartnerKind}
            onChange={(event) => setNewPartnerKind(event.target.value as PartnerKind)}
            className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
          >
            <option value="Partner">Partner</option>
            <option value="Donor">Donor</option>
          </select>
          <input
            value={newPartnerDisplayOrder}
            onChange={(event) => setNewPartnerDisplayOrder(event.target.value)}
            placeholder="Display order (optional)"
            className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
          />
          <input
            value={newPartnerLogoPath}
            onChange={(event) => setNewPartnerLogoPath(event.target.value)}
            placeholder="Logo file under public (e.g. 'WANETAM logo.png')"
            className="md:col-span-2 rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
          />

          <button
            type="button"
            onClick={() => {
              const logoFile = newPartnerLogoPath.trim().replace(/^\/+/, '')
              const displayOrder = newPartnerDisplayOrder.trim()
                ? Number.parseInt(newPartnerDisplayOrder.trim(), 10)
                : undefined

              createPartnerDonorMutation.mutate({
                name: newPartnerName.trim(),
                url: newPartnerUrl.trim(),
                logoPath: logoFile,
                kind: newPartnerKind,
                displayOrder,
              })
            }}
            disabled={!newPartnerName.trim() || !newPartnerUrl.trim() || !newPartnerLogoPath.trim()}
            className="md:col-span-2 rounded-md bg-primary px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
          >
            Add to guest page
          </button>
        </div>

        <div className="mt-3 overflow-x-auto rounded-lg border border-section/80">
          <table className="min-w-full border-collapse text-xs">
            <thead className="bg-section/60 text-[11px] uppercase tracking-wide text-text/70">
              <tr>
                <th className="px-3 py-2 text-left">Logo</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Kind</th>
                <th className="px-3 py-2 text-left">Order</th>
              </tr>
            </thead>
            <tbody>
              {partnersDonors.map((p) => {
                const logoSrc = p.logoPath.startsWith('/') ? p.logoPath : `/${p.logoPath}`
                return (
                  <tr key={p.id} className="border-t border-section/80">
                    <td className="px-3 py-2">
                      <img
                        src={encodeURI(logoSrc)}
                        alt={p.name}
                        className="h-8 w-auto object-contain"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.kind}</td>
                    <td className="px-3 py-2">{p.displayOrder}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border border-section/80 bg-section/30 p-3">
          <h3 className="font-heading text-sm font-semibold text-primary">
            People preview (team + committees)
          </h3>
          <p className="mt-1 text-[11px] text-text/80">
            Collapsible preview of all people records, with image and bio snippets for presentation checks.
          </p>

          <div className="mt-3 space-y-3">
            <PeoplePreviewSection title={`HDRWA Team (${teamMembers.length})`} people={teamMembers} defaultOpen />
            <PeoplePreviewSection
              title={`Steering Committee (${steeringMembers.length})`}
              people={steeringMembers}
            />
            <PeoplePreviewSection
              title={`Data Access Committee (${dataAccessMembers.length})`}
              people={dataAccessMembers}
            />
          </div>
        </div>
      </details>

      <section className="rounded-xl border border-primary/20 bg-primary/6 p-3 text-xs">
        <h2 className="font-heading text-sm font-semibold text-primary">
          How this CRM is used
        </h2>
        <p className="mt-1 text-text/80">
          This workspace acts as a website operations CRM: teams use it to manage page updates, dataset listing quality, publishing readiness, and governance-linked risks before content goes live.
        </p>
      </section>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="portal-card rounded-xl p-3">
      <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
        {label}
      </h2>
      <p className="mt-2 text-2xl font-semibold text-primary">{value}</p>
    </div>
  )
}

type PeoplePreviewPerson = {
  slug: string
  name: string
  role: string
  image: string
  bio: string
}

function PeoplePreviewSection({
  title,
  people,
  defaultOpen = false,
}: {
  title: string
  people: PeoplePreviewPerson[]
  defaultOpen?: boolean
}) {
  return (
    <details
      open={defaultOpen}
      className="rounded-lg border border-section/80 bg-white/80"
    >
      <summary className="cursor-pointer list-none px-3 py-2 text-[12px] font-semibold text-primary">
        {title}
      </summary>
      <div className="grid gap-3 border-t border-section/70 p-3 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((m) => (
          <article key={m.slug} className="rounded-lg border border-section/70 bg-white p-2.5">
            <div className="flex items-center gap-3">
              <img
                src={encodeURI(m.image)}
                alt={m.name}
                loading="lazy"
                className="h-14 w-14 rounded-lg object-cover object-top"
              />
              <div>
                <h4 className="text-[11px] font-semibold text-text/90">{m.name}</h4>
                <p className="line-clamp-2 text-[10px] text-text/65">{m.role}</p>
              </div>
            </div>
            <p className="mt-2 line-clamp-3 text-[10px] leading-relaxed text-text/75">
              {m.bio}
            </p>
          </article>
        ))}
      </div>
    </details>
  )
}
