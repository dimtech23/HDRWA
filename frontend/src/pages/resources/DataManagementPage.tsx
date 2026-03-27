export function DataManagementPage() {
  const sops = [
    'Data Submission & Verification',
    'Data Validation & Quality Control',
    'Metadata Collection & Management',
    'Data Discovery & Access',
    'Data Organization & Storage',
    'Data Versioning & Tracking',
  ]

  return (
    <div className="px-4 py-10 lg:px-8 lg:py-12">
      <h1 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
        Data management
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-text/80">
        Data management plays a crucial role in health data research, ensuring
        that data is organized, secure, and accessible for analysis and
        interpretation.
      </p>
      <p className="mt-2 max-w-3xl text-sm text-text/80">
        In this section, you will find SOPs detailing the lifecycle and data
        flow of research data and the processes that data goes through prior to
        being submitted for sharing purposes.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-primary">
        {sops.map((s) => (
          <li
            key={s}
            className="flex items-center justify-between rounded-xl border border-section bg-white px-4 py-3"
          >
            <span>{s}</span>
            <button className="rounded-full border border-primary/30 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/5">
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

