import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/navigation/Sidebar'
import { PortalHeader } from '../../components/navigation/PortalHeader'

export function PortalLayout() {
  return (
    <div className="portal-shell flex min-h-screen text-text">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <PortalHeader />
        <main className="portal-surface flex-1 px-4 py-4 lg:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

