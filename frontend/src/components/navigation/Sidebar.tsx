import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'

const linkBase =
  'group relative flex items-center justify-between overflow-hidden rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200'

const activeLink =
  'border border-primary/25 bg-white text-secondary shadow-[0_10px_24px_-16px_rgba(31,60,136,0.8)] before:absolute before:bottom-1 before:left-1 before:top-1 before:w-1 before:rounded-full before:bg-linear-to-b before:from-primary before:to-secondary'

const inactiveLink =
  'border border-transparent bg-white/55 text-text/80 hover:-translate-y-px hover:border-primary/20 hover:bg-white/90 hover:text-secondary'

export function Sidebar() {
  const { user } = useAuth()
  const role = user?.role
  const canSubmit = role === 'contributor' || role === 'manager'
  const canReviewMetadata = role === 'manager'

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-primary/25 bg-linear-to-b from-[#e7f4ee] via-[#e9f3fa] to-[#dbe9f6] px-3 py-4 text-text/85 shadow-[8px_0_34px_-20px_rgba(31,60,136,0.55)] lg:flex lg:flex-col">
      <div className="mb-4 rounded-2xl border border-primary/30 bg-white/80 px-3 py-3 shadow-sm backdrop-blur">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75">
          User workspace
        </p>
        <p className="mt-1 text-[11px] font-semibold text-secondary/90">
          {user?.name || 'Signed in'}
        </p>
        <p className="text-[11px] capitalize text-text/60">
          {user?.role === 'manager' ? 'Data Manager' : user?.role}
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-4">
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/50">
            Workspace
          </p>
          <NavLink
            to="/portal/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>Overview</span>
          </NavLink>
          <NavLink
            to="/portal/catalogue"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>Dataset catalogue</span>
          </NavLink>
        </div>
        {canSubmit && (
          <div className="space-y-1">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/50">
              Submissions
            </p>
            <NavLink
              to="/portal/submit-dataset"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <span>Submit dataset</span>
            </NavLink>
            <NavLink
              to="/portal/my-submissions"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <span>My submissions</span>
            </NavLink>
          </div>
        )}
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/50">
            Access
          </p>
          <NavLink
            to="/portal/request-access"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>Request access</span>
          </NavLink>
          <NavLink
            to="/portal/my-requests"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <span>My requests</span>
          </NavLink>
        </div>
        {canReviewMetadata && (
          <div className="space-y-1">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/50">
              Curation
            </p>
            <NavLink
              to="/portal/metadata-review"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <span>Metadata review</span>
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  )
}

