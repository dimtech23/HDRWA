import { NavLink } from 'react-router-dom'

const linkBase =
  'group relative flex items-center justify-between overflow-hidden rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200'

const activeLink =
  'border border-primary/25 bg-white text-secondary shadow-[0_10px_24px_-16px_rgba(31,60,136,0.8)] before:absolute before:bottom-1 before:left-1 before:top-1 before:w-1 before:rounded-full before:bg-linear-to-b before:from-primary before:to-secondary'

const inactiveLink =
  'border border-transparent bg-white/55 text-text/80 hover:-translate-y-px hover:border-primary/20 hover:bg-white/90 hover:text-secondary'

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-primary/25 bg-linear-to-b from-[#e7f4ee] via-[#e9f3fa] to-[#dbe9f6] px-3 py-4 text-text/85 shadow-[8px_0_34px_-20px_rgba(31,60,136,0.55)] lg:flex lg:flex-col">
      <div className="mb-4 rounded-2xl border border-primary/30 bg-white/80 px-3 py-3 shadow-sm backdrop-blur">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75">
          Admin console
        </p>
        <p className="mt-1 text-[11px] text-text/60">
          Data governance and access control
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-4">
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/50">
            Operations
          </p>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/governance-crm"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>Governance CRM</span>
          </NavLink>
        </div>
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/50">
            Review
          </p>
          <NavLink
            to="/admin/qa-metadata"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>QA metadata</span>
          </NavLink>
          <NavLink
            to="/admin/review-requests"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>Access requests</span>
          </NavLink>
        </div>
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/50">
            Directory
          </p>
          <NavLink
            to="/admin/user-management"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>User management</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}

