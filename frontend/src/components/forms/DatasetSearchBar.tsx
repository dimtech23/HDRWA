type DatasetSearchBarProps = {
  onSearch?: (value: string) => void
}

export function DatasetSearchBar({ onSearch }: DatasetSearchBarProps) {
  return (
    <form
      className="flex flex-col gap-2 rounded-xl border border-section bg-white/80 p-3 shadow-sm backdrop-blur sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        type="search"
        placeholder="Search datasets by keyword, disease area, country..."
        className="h-10 flex-1 rounded-lg border border-section px-3 text-xs outline-none ring-primary/20 focus:ring-2"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <button
        type="submit"
        className="h-10 rounded-lg bg-primary px-4 text-xs font-medium text-white shadow-sm hover:bg-primary/90"
      >
        Browse datasets
      </button>
    </form>
  )
}

