import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../services/api/auth'
import { ToastMessage } from '../../components/feedback/ToastMessage'

export function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [institution, setInstitution] = useState('')
  const [country, setCountry] = useState('')
  const [requestedRole, setRequestedRole] = useState('Researcher')
  const [justification, setJustification] = useState('')
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'error' } | null>(null)

  const registerMutation = useMutation({
    mutationFn: authApi.createRegistration,
    onSuccess: () => {
      setFullName('')
      setEmail('')
      setInstitution('')
      setCountry('')
      setRequestedRole('Researcher')
      setJustification('')
      setToast({ text: 'Registration submitted successfully.', tone: 'success' })
    },
    onError: () => setToast({ text: 'Registration failed. Please try again.', tone: 'error' }),
  })

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-section/40 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-section bg-white p-6 shadow-sm">
        <h1 className="font-heading text-xl font-semibold text-primary">
          Register for access
        </h1>
        <p className="mt-2 text-xs text-text/80">
          Complete this form to request an account for submitting datasets or
          requesting controlled access.
        </p>
        {toast && (
          <div className="mt-3">
            <ToastMessage text={toast.text} tone={toast.tone} onClose={() => setToast(null)} />
          </div>
        )}
        <form className="mt-4 space-y-3 text-xs">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Full name
              </span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="Dr Amina Diallo"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="name@example.org"
              />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Institution
              </span>
              <input
                value={institution}
                onChange={(event) => setInstitution(event.target.value)}
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="Institution name"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Country
              </span>
              <input
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
                placeholder="Country"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium text-text/80">
              Requested role
            </span>
            <select
              value={requestedRole}
              onChange={(event) => setRequestedRole(event.target.value)}
              className="w-full rounded-lg border border-section bg-white px-3 py-2 text-xs"
            >
              <option>Researcher</option>
              <option>Data contributor</option>
              <option>Data manager</option>
              <option>Data access / governance</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium text-text/80">
              Brief justification
            </span>
            <textarea
              rows={3}
              value={justification}
              onChange={(event) => setJustification(event.target.value)}
              className="w-full rounded-lg border border-section px-3 py-2 text-xs outline-none ring-primary/20 focus:ring-2"
              placeholder="Describe how you intend to use the platform and data."
            />
          </label>
          <button
            type="button"
            onClick={() =>
              registerMutation.mutate({
                fullName,
                email,
                institution,
                country,
                requestedRole,
                justification,
              })
            }
            className="mt-2 w-full rounded-full bg-primary px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-primary/90"
          >
            Submit registration
          </button>
        </form>
      </div>
    </div>
  )
}

