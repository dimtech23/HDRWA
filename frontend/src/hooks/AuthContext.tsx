import { createContext, useContext, useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

type Role = 'researcher' | 'contributor' | 'manager' | 'admin'

type User = {
  id: string
  name: string
  role: Role
}

type AuthContextValue = {
  user: User | null
  loginAs: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const value = useMemo(
    () => ({
      user,
      loginAs: (role: Role) => {
        setUser({
          id: 'demo',
          name: `Demo ${role}`,
          role,
        })
        if (role === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/portal/dashboard')
        }
      },
      logout: () => {
        setUser(null)
        navigate('/')
      },
    }),
    [user, navigate],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

type ProtectedRouteProps = {
  children: ReactNode
  requiredRole?: Role
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/portal/dashboard" replace />
  }

  return <>{children}</>
}

