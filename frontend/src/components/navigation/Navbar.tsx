import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'

const ChevronDown = () => (
  <svg className="ml-1 h-3 w-3 transition-transform duration-200 group-data-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

type DropdownItem = { label: string; to: string }

function DropdownMenu({ label, items }: { label: string; items: DropdownItem[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = items.some(i => location.pathname === i.to)

  return (
    <div ref={ref} className="relative group" data-open={open ? '' : undefined}>
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-text/80'}`}
      >
        {label}
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-xl border border-primary/20 bg-white/95 py-1 shadow-[0_16px_30px_-20px_rgba(31,60,136,0.6)] backdrop-blur">
          {items.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-section/80 hover:text-primary ${isActive ? 'bg-primary/10 text-primary' : 'text-text/80'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  useEffect(() => { setMobileOpen(false) }, [location])
  const euLogoSrc = `${import.meta.env.BASE_URL}eu-logo.jpg`
  const edctpLogoSrc = `${import.meta.env.BASE_URL}edctp-logo.jpg`
  const hdrwaLogoSrc = `${import.meta.env.BASE_URL}hdrwa-logo.png`

  return (
    <header className="sticky top-0 z-40 border-b border-section bg-white/95 backdrop-blur">
      <div className="border-b border-primary/80 bg-primary">
        <div className="flex flex-col items-center justify-between gap-1 px-4 py-1.5 text-[13px] text-white/95 sm:flex-row lg:px-8">
          <span className="text-center sm:text-left">
            This project is part of the{' '}
            <span className="font-semibold text-white">EDCTP&nbsp;2 Programme funded by the European Union</span>
          </span>
          <div className="flex items-center gap-2 [&_img]:h-5 [&_img]:w-auto [&_img]:rounded-sm [&_img]:opacity-90">
            <img src={euLogoSrc} alt="European Union" />
            <img src={edctpLogoSrc} alt="EDCTP" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src={hdrwaLogoSrc}
            alt="Health Data Research West Africa"
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-5 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-full px-2 py-1 text-sm font-medium transition-colors hover:text-primary ${isActive ? 'bg-primary/10 text-primary' : 'text-text/80'}`
            }
          >
            Home
          </NavLink>

          <DropdownMenu
            label="About"
            items={[
              { label: 'About Us', to: '/about' },
              { label: 'HDRWA Team', to: '/team' },
              { label: 'Partners & Donors', to: '/partners' },
            ]}
          />

          <DropdownMenu
            label="Governance"
            items={[
              { label: 'Steering Committee', to: '/governance/steering-committee' },
              { label: 'Data Access Committee', to: '/governance/data-access-committee' },
            ]}
          />

          <DropdownMenu
            label="Data"
            items={[
              { label: 'Submit Data', to: '/data/submit' },
              { label: 'Access Data', to: '/data/access' },
              { label: 'Benefits of Sharing', to: '/data/benefits' },
              { label: 'Privacy & Ethical Standards', to: '/data/privacy' },
            ]}
          />

          <NavLink
            to="/research"
            className={({ isActive }) =>
              `rounded-full px-2 py-1 text-sm font-medium transition-colors hover:text-primary ${isActive ? 'bg-primary/10 text-primary' : 'text-text/80'}`
            }
          >
            Research
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) =>
              `rounded-full px-2 py-1 text-sm font-medium transition-colors hover:text-primary ${isActive ? 'bg-primary/10 text-primary' : 'text-text/80'}`
            }
          >
            Resources
          </NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/portal/dashboard'}
                className="rounded-full bg-primary/12 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
              >
                Portal
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-primary/20 bg-white/80 px-3 py-1.5 text-sm font-medium text-text/70 hover:bg-section/60"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-primary/30 bg-white/80 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90 sm:inline-flex"
              >
                Register
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="ml-1 rounded-lg p-1.5 text-text/70 hover:bg-section/80 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-primary/15 bg-linear-to-b from-white to-section/45 px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {[
              { label: 'Home', to: '/' },
              { label: 'About Us', to: '/about' },
              { label: 'HDRWA Team', to: '/team' },
              { label: 'Partners & Donors', to: '/partners' },
              { label: 'Steering Committee', to: '/governance/steering-committee' },
              { label: 'Data Access Committee', to: '/governance/data-access-committee' },
              { label: 'Submit Data', to: '/data/submit' },
              { label: 'Access Data', to: '/data/access' },
              { label: 'Benefits of Sharing', to: '/data/benefits' },
              { label: 'Privacy & Ethical Standards', to: '/data/privacy' },
              { label: 'Research', to: '/research' },
              { label: 'Resources', to: '/resources' },
              { label: 'Q&A', to: '/qa' },
            ].map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-primary/12 text-primary' : 'text-text/80 hover:bg-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}