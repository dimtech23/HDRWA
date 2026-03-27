import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { governanceApi } from '../../services/api/governance'

export function QaMetadataPage() {
  const queryClient = useQueryClient()
  const { data: operations = [] } = useQuery({
    queryKey: ['dataset-operations'],
    queryFn: governanceApi.listDatasetOperations,
  })
  const { data: governanceRisks = [] } = useQuery({
    queryKey: ['governance-risks'],
    queryFn: governanceApi.listRisks,
  })
  const qaQueue = operations.filter(
    (entry) => entry.stage === 'Metadata QA' || entry.qaStatus !== 'Complete',
  )
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

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-xl font-semibold text-primary">QA metadata</h1>
        <p className="mt-1 text-xs text-text/80">
          Prioritise metadata quality checks before datasets are published.
        </p>
      </header>
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
            {qaQueue.map((item) => (
              <tr key={item.id} className="border-t border-section/80">
                <td className="px-3 py-2">{item.dataset}</td>
                <td className="px-3 py-2">
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
                </td>
                <td className="px-3 py-2">
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
                </td>
                <td className="px-3 py-2">{item.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="portal-card rounded-xl p-3 text-xs">
        <h2 className="font-heading text-sm font-semibold text-primary">Linked governance risks</h2>
        <ul className="mt-2 space-y-2">
          {governanceRisks.map((risk) => (
            <li key={risk.id} className="rounded-lg bg-section/50 px-2 py-1.5">
              <span className="font-medium">{risk.title}</span> ({risk.severity})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

