import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DatasetSearchBar } from '../../components/forms/DatasetSearchBar'
import { DatasetCard } from '../../components/cards/DatasetCard'
import { datasetsApi } from '../../services/api/datasets'

export function CataloguePage() {
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('All topics')
  const [selectedAccess, setSelectedAccess] = useState('Any')
  const { data } = useQuery({
    queryKey: ['datasets'],
    queryFn: datasetsApi.listDatasets,
  })
  const datasets = data ?? []

  const filtered = datasets.filter((d) => {
    const term = search.toLowerCase()
    const matchSearch =
      !term ||
      d.title.toLowerCase().includes(term) ||
      d.topic.toLowerCase().includes(term) ||
      d.country.toLowerCase().includes(term) ||
      d.institution.toLowerCase().includes(term)
    const matchTopic = selectedTopic === 'All topics' || d.topic === selectedTopic
    const matchAccess = selectedAccess === 'Any' || d.accessLevel === selectedAccess
    return matchSearch && matchTopic && matchAccess
  })

  const topics = useMemo(() => {
    const unique = Array.from(new Set(datasets.map((d) => d.topic)))
    unique.sort((a, b) => a.localeCompare(b))
    return unique
  }, [datasets])

  return (
    <div className="px-4 py-8 lg:px-8 lg:py-10">
      <header className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold text-primary sm:text-2xl">
            Data Catalogue
          </h1>
          <p className="mt-1 text-xs text-text/80">
            Public view of available datasets. Detailed access is governed via
            secure requests.
          </p>
        </div>
      </header>
      <div className="mb-4 rounded-xl border border-primary/15 bg-primary/5 px-3 py-2 text-xs text-text/80">
        Guest users can browse metadata. For controlled or restricted datasets, sign in and submit an access request.
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <DatasetSearchBar onSearch={setSearch} />
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((dataset) => (
              <DatasetCard key={dataset.id} {...dataset} />
            ))}
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-section bg-white/80 p-4 text-xs text-text/70 sm:col-span-2">
                No datasets match current filters. Adjust search terms or filters to continue.
              </div>
            )}
          </div>
        </div>
        <aside className="space-y-3 rounded-xl border border-section bg-section/40 p-3 text-xs">
          <h2 className="font-heading text-sm font-semibold text-primary">
            Filters
          </h2>
          <div className="space-y-2">
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Country
              </span>
              <select className="w-full rounded-lg border border-section bg-white px-2 py-2 text-[11px]">
                <option>All countries</option>
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>Senegal</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Topic
              </span>
              <select
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
                className="w-full rounded-lg border border-section bg-white px-2 py-2 text-[11px]"
              >
                <option>All topics</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-text/80">
                Access level
              </span>
              <select
                value={selectedAccess}
                onChange={(event) => setSelectedAccess(event.target.value)}
                className="w-full rounded-lg border border-section bg-white px-2 py-2 text-[11px]"
              >
                <option>Any</option>
                <option>Open</option>
                <option>Controlled</option>
                <option>Restricted</option>
              </select>
            </label>
          </div>
        </aside>
      </div>
    </div>
  )
}

