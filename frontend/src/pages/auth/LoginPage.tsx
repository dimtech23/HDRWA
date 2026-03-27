import { useAuth } from '../../hooks/AuthContext'

export function LoginPage() {
  const { loginAs } = useAuth()

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-section/40 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-section bg-white shadow-sm lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
        <aside className="hidden bg-linear-to-b from-[#ebf6ef] via-[#e6f2f9] to-[#dfeaf5] p-6 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/85">
              HDRWA Portal
            </p>
            <h2 className="mt-2 font-heading text-xl font-semibold text-primary">
              Secure data collaboration workspace
            </h2>
            <p className="mt-2 text-xs text-text/75">
              Sign in to access submission workflows, request tracking, and governance dashboards.
            </p>
          </div>
          <div className="rounded-xl border border-primary/25 bg-white/70 p-3 text-xs text-text/75">
            Role-based routes:
            <ul className="mt-1 space-y-1 text-[11px]">
              <li>Researcher / Contributor / Data Manager - User portal</li>
              <li>Admin - Governance and operations console</li>
            </ul>
          </div>
        </aside>

        <div className="p-6">
          <h1 className="font-heading text-xl font-semibold text-primary">
            Sign in to HDRWA
          </h1>
          <p className="mt-2 text-xs text-text/80">
            For the demo, choose a role to preview the corresponding portal view.
            Authentication and SSO will be integrated later.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => loginAs('researcher')}
              className="rounded-lg border border-section bg-section/60 px-3 py-2 text-left font-medium text-text hover:border-primary/40 hover:text-primary"
            >
              Researcher
            </button>
            <button
              type="button"
              onClick={() => loginAs('contributor')}
              className="rounded-lg border border-section bg-section/60 px-3 py-2 text-left font-medium text-text hover:border-primary/40 hover:text-primary"
            >
              Data contributor
            </button>
            <button
              type="button"
              onClick={() => loginAs('manager')}
              className="rounded-lg border border-section bg-section/60 px-3 py-2 text-left font-medium text-text hover:border-primary/40 hover:text-primary"
            >
              Data manager
            </button>
            <button
              type="button"
              onClick={() => loginAs('admin')}
              className="rounded-lg border border-section bg-section/60 px-3 py-2 text-left font-medium text-text hover:border-primary/40 hover:text-primary"
            >
              Admin / governance
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

