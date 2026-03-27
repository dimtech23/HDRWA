import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { governanceApi } from '../../services/api/governance'

export function AdminDashboardPage() {
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
  const { data: governanceContacts = [] } = useQuery({
    queryKey: ['governance-contacts'],
    queryFn: governanceApi.listContacts,
  })
  const { data: governanceRisks = [] } = useQuery({
    queryKey: ['governance-risks'],
    queryFn: governanceApi.listRisks,
  })

  const pendingContent = contentUpdates.filter(
    (update) => update.status === 'Draft' || update.status === 'In review',
  ).length
  const activeDatasets = datasetOperations.filter((entry) => entry.stage !== 'Live').length
  const needsReviewSections = siteSectionHealth.filter((section) => section.status === 'Needs review').length

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-xl font-semibold text-primary">
          Admin dashboard
        </h1>
        <p className="mt-1 text-xs text-text/80">
          Overview of website content operations, dataset publishing, and governance quality.
        </p>
      </header>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Pending content actions
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">{pendingContent}</p>
        </div>
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Active dataset workflows
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">{activeDatasets}</p>
        </div>
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Active governance contacts
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">
            {governanceContacts.filter((contact) => contact.engagementStage === 'Active').length}
          </p>
        </div>
        <div className="portal-card rounded-xl p-3">
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-text/60">
            Sections needing review
          </h2>
          <p className="mt-2 text-2xl font-semibold text-primary">{needsReviewSections}</p>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="portal-card rounded-xl p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-heading text-sm font-semibold text-primary">
              Governance CRM workspace
            </h2>
            <Link
              to="/admin/governance-crm"
              className="rounded-full border border-primary/20 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/5"
            >
              Open CRM
            </Link>
          </div>
          <p className="mt-2 text-text/80">
            Manage website pages, dataset records, and publishing readiness from one place.
          </p>
        </div>
        <div className="portal-card rounded-xl p-3 text-xs">
          <h2 className="font-heading text-sm font-semibold text-primary">
            High-priority risk items
          </h2>
          <ul className="mt-2 space-y-2">
            {governanceRisks
              .filter((risk) => risk.severity === 'High')
              .map((risk) => (
                <li key={risk.id} className="rounded-lg bg-section/50 px-2 py-1.5">
                  <p className="font-medium">{risk.title}</p>
                  <p className="text-[11px] text-text/65">
                    {risk.area} - owner: {risk.owner}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

