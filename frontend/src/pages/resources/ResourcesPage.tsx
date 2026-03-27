import { Link } from 'react-router-dom'

export function ResourcesPage() {
  return (
    <div className="px-4 py-8 lg:px-8 lg:py-10">
      <h1 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
        Resources
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-text/80">
        This section provides documentation on governance and data management to
        support data managers, researchers, and governance bodies.
      </p>
      <p className="mt-1 max-w-3xl text-xs text-text/70">
        Key documents include the HDRWA Data Use Agreement and the Data Access Guideline.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link
          to="/resources/governance-structure"
          className="rounded-xl border border-section bg-white p-4 text-sm hover:border-primary/60 hover:bg-section/60"
        >
          <h2 className="font-heading text-base font-semibold text-primary">
            Governance structure
          </h2>
          <p className="mt-1 text-text/80">
            Policies and procedures that govern how the platform is managed and
            how data is accessed, shared and submitted.
          </p>
        </Link>
        <Link
          to="/resources/data-management"
          className="rounded-xl border border-section bg-white p-4 text-sm hover:border-primary/60 hover:bg-section/60"
        >
          <h2 className="font-heading text-base font-semibold text-primary">
            Data management
          </h2>
          <p className="mt-1 text-text/80">
            SOPs detailing the lifecycle and data flow of research data and
            processes prior to sharing.
          </p>
        </Link>
      </div>
    </div>
  )
}

