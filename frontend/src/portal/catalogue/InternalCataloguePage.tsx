import { DatasetCard } from '../../components/cards/DatasetCard'
import { DatasetSearchBar } from '../../components/forms/DatasetSearchBar'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { datasetsApi } from '../../services/api/datasets'
import { useAuth } from '../../hooks/AuthContext'

export function InternalCataloguePage() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('All topics')
  const { data } = useQuery({
    queryKey: ['datasets'],
    queryFn: datasetsApi.listDatasets,
  })
  const datasets = data ?? []

  const filtered = datasets.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase())
    const matchTopic = topic === 'All topics' || d.topic === topic
    return matchSearch && matchTopic
  })

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-xl font-semibold text-primary">
          Internal dataset catalogue
        </h1>
        <p className="mt-1 text-xs text-text/80">
          Full catalogue view for authenticated users backed by the local demo database.
        </p>
      </header>
      {user?.role === 'researcher' && (
        <div className="rounded-xl border border-secondary/20 bg-secondary/5 px-3 py-2 text-xs text-text/80">
          You are in researcher mode: browse datasets and use "Request governed access" on controlled/restricted items.
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-60 flex-1">
          <DatasetSearchBar onSearch={setSearch} />
        </div>
        <select
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="rounded-lg border border-section bg-white px-3 py-2 text-xs"
        >
          <option>All topics</option>
          <option>Tuberculosis</option>
          <option>Malaria</option>
          <option>HIV</option>
          <option>Public health</option>
        </select>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {filtered.map((d) => (
          <DatasetCard key={d.id} {...d} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-section bg-white/80 p-4 text-xs text-text/70 md:col-span-3">
            No datasets match current search/filter. Try a broader topic or clear the search.
          </div>
        )}
      </div>
    </div>
  )
}

