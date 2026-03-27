import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { governanceApi } from '../../services/api/governance'
import { useAuth } from '../../hooks/AuthContext'

export function MetadataReviewPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const canEdit = user?.role === 'manager'
  const { data: operations = [] } = useQuery({
    queryKey: ['dataset-operations'],
    queryFn: governanceApi.listDatasetOperations,
  })

  const updateOpMutation = useMutation({
    mutationFn: (payload: {
      id: string
      stage: 'Metadata QA' | 'Governance review' | 'Publication prep' | 'Live'
      qaStatus: 'Blocked' | 'In progress' | 'Complete'
      nextAction: string
    }) =>
      governanceApi.patchDatasetOperation(payload.id, {
        stage: payload.stage,
        qaStatus: payload.qaStatus,
        nextAction: payload.nextAction,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dataset-operations'] }),
  })

  if (!canEdit) {
    return (
      <div className="space-y-4">
        <h1 className="font-heading text-xl font-semibold text-primary">Metadata review</h1>
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Metadata workflow tools are available for Data Manager role.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-xl font-semibold text-primary">Metadata review</h1>
        <p className="mt-1 text-xs text-text/80">
          {canEdit
            ? 'Data Managers review metadata and complete the verification checklist before progressing datasets.'
            : 'Read-only metadata workflow overview.'}
        </p>
      </header>
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-[11px] text-text/80">
        <p className="font-semibold text-primary">Verification checklist for Data Managers</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>Metadata completeness and data dictionary consistency checked.</li>
          <li>Governance and access conditions validated.</li>
          <li>Submission aligns with Data Governance / Data Use Agreement requirements.</li>
        </ul>
      </div>
      <div className="portal-card overflow-x-auto rounded-xl text-xs">
        <table className="min-w-full border-collapse">
          <thead className="bg-section/60 text-[11px] uppercase tracking-wide text-text/70">
            <tr>
              <th className="px-3 py-2 text-left">Dataset</th>
              <th className="px-3 py-2 text-left">Stage</th>
              <th className="px-3 py-2 text-left">QA status</th>
              <th className="px-3 py-2 text-left">Next action</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((item) => (
              <tr key={item.id} className="border-t border-section/80">
                <td className="px-3 py-2">{item.dataset}</td>
                <td className="px-3 py-2">
                  {canEdit ? (
                    <select
                      value={item.stage}
                      onChange={(event) =>
                        updateOpMutation.mutate({
                          id: item.id,
                          stage: event.target.value as typeof item.stage,
                          qaStatus: item.qaStatus,
                          nextAction: item.nextAction,
                        })
                      }
                      className="rounded-md border border-section bg-white px-2 py-1 text-[11px]"
                    >
                      <option value="Metadata QA">Metadata QA</option>
                      <option value="Governance review">Governance review</option>
                      <option value="Publication prep">Publication prep</option>
                      <option value="Live">Live</option>
                    </select>
                  ) : (
                    item.stage
                  )}
                </td>
                <td className="px-3 py-2">
                  {canEdit ? (
                    <select
                      value={item.qaStatus}
                      onChange={(event) =>
                        updateOpMutation.mutate({
                          id: item.id,
                          stage: item.stage,
                          qaStatus: event.target.value as typeof item.qaStatus,
                          nextAction: item.nextAction,
                        })
                      }
                      className="rounded-md border border-section bg-white px-2 py-1 text-[11px]"
                    >
                      <option value="Blocked">Blocked</option>
                      <option value="In progress">In progress</option>
                      <option value="Complete">Complete</option>
                    </select>
                  ) : (
                    item.qaStatus
                  )}
                </td>
                <td className="px-3 py-2">{item.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
