import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/navigation/Navbar'
import { Footer } from '../../components/navigation/Footer'

export function AppLayout() {
  return (
    <div className="portal-shell flex min-h-screen flex-col text-text">
      <Navbar />
      <main className="portal-surface flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

