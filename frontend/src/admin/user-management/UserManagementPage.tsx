import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { governanceApi } from '../../services/api/governance'

export function UserManagementPage() {
  const queryClient = useQueryClient()
  const { data: contacts = [] } = useQuery({
    queryKey: ['governance-contacts'],
    queryFn: governanceApi.listContacts,
  })
  const [name, setName] = useState('')
  const [organisation, setOrganisation] = useState('')

  const createContactMutation = useMutation({
    mutationFn: governanceApi.createContact,
    onSuccess: () => {
      setName('')
      setOrganisation('')
      queryClient.invalidateQueries({ queryKey: ['governance-contacts'] })
    },
  })
  const updateStageMutation = useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: 'Lead' | 'Onboarded' | 'Active' }) =>
      governanceApi.patchContactStage(id, stage),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['governance-contacts'] }),
  })

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-xl font-semibold text-primary">
          User management
        </h1>
        <p className="mt-1 text-xs text-text/80">
          View and manage registered users and roles. Integration with
          institutional identity and SSO can be added later.
        </p>
      </header>
      <div className="grid gap-2 rounded-lg border border-section/80 bg-section/35 p-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full name"
          className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
        />
        <input
          value={organisation}
          onChange={(event) => setOrganisation(event.target.value)}
          placeholder="Organisation"
          className="rounded-md border border-section bg-white px-2 py-1 text-xs outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={() =>
            createContactMutation.mutate({
              name,
              organisation,
              role: 'Research lead',
              country: 'Unspecified',
              segment: 'Researcher',
              owner: 'Admin',
              engagementStage: 'Lead',
              lastEngagement: new Date().toISOString().slice(0, 10),
            })
          }
          disabled={!name.trim() || !organisation.trim()}
          className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
        >
          Add user
        </button>
      </div>
      <div className="portal-card overflow-x-auto rounded-xl text-xs">
        <table className="min-w-full border-collapse">
          <thead className="bg-section/60 text-[11px] uppercase tracking-wide text-text/70">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Organisation</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Stage</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t border-section/80">
                <td className="px-3 py-2">{contact.name}</td>
                <td className="px-3 py-2">{contact.organisation}</td>
                <td className="px-3 py-2">{contact.role}</td>
                <td className="px-3 py-2">
                  <select
                    value={contact.engagementStage}
                    onChange={(event) =>
                      updateStageMutation.mutate({
                        id: contact.id,
                        stage: event.target.value as 'Lead' | 'Onboarded' | 'Active',
                      })
                    }
                    className="rounded-md border border-section bg-white px-2 py-1 text-[11px]"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Onboarded">Onboarded</option>
                    <option value="Active">Active</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

