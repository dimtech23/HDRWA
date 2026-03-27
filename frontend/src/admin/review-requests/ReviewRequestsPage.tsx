import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { portalApi } from '../../services/api/portal'

export function ReviewRequestsPage() {
  const queryClient = useQueryClient()
  const { data = [] } = useQuery({
    queryKey: ['access-requests'],
    queryFn: portalApi.listAccessRequests,
  })
  const reviewQueue = data.filter(
    (request) =>
      request.status === 'DAC review' ||
      request.status === 'Pending' ||
      request.status === 'Clarification',
  )
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      portalApi.patchAccessRequestStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['access-requests'] }),
  })

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-xl font-semibold text-primary">
          Access request review
        </h1>
        <p className="mt-1 text-xs text-text/80">
          DAC review view. Approved requests move to Data Manager release workflow.
        </p>
        <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] text-text/80">
          As DAC reviewer: review requests, request clarification, or approve for Data Manager release.
        </div>
      </header>
      <div className="portal-card overflow-x-auto rounded-xl text-xs">
        <table className="min-w-full border-collapse">
          <thead className="bg-section/60 text-[11px] uppercase tracking-wide text-text/70">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Dataset</th>
              <th className="px-3 py-2 text-left">Purpose</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviewQueue.map((request) => (
              <tr key={request.id} className="border-t border-section/80">
                <td className="px-3 py-2">{request.id}</td>
                <td className="px-3 py-2">{request.dataset}</td>
                <td className="px-3 py-2">{request.purpose}</td>
                <td className="px-3 py-2">{request.status}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white"
                      onClick={() =>
                        updateStatusMutation.mutate({ id: request.id, status: 'Approved - pending release' })
                      }
                    >
                      DAC approve
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-rose-600 px-2 py-1 text-[10px] font-semibold text-white"
                      onClick={() =>
                        updateStatusMutation.mutate({ id: request.id, status: 'Rejected' })
                      }
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

