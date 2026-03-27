export function GovernanceStructurePage() {
  const docsBaseUrl = `${import.meta.env.BASE_URL}docs/`
  const docs = [
    { name: 'Steering Committee Terms of Reference', fileName: '' },
    { name: 'Data Access Committee Terms of Reference', fileName: '' },
    { name: 'HDRWA - Data Use Agreement 04-07-2023', fileName: 'HDRWA -  Data Use Agreement 04-07-2023.pdf' },
    {
      name: 'Health Data Research -West Africa (HDRWA) Platform- Data Access Guidelines 23-03-2023',
      fileName: 'Health Data Research -West Africa (HDRWA) Platform- Data Access Guidelines 23-03-2023.pdf',
    },
    { name: 'Data Access Application Form', fileName: '' },
    { name: 'Terms of Data Submission', fileName: '' },
    { name: 'Conflict of Interest Policy', fileName: '' },
    { name: 'Data Privacy Policy', fileName: '' },
  ]

  return (
    <div className="px-4 py-10 lg:px-8 lg:py-12">
      <h1 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
        Governance structure
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-text/80">
        The governance structure is a critical component of our platform as it
        outlines the policies and procedures that govern how our platform is
        managed and how data is accessed, shared and submitted.
      </p>
      <p className="mt-2 max-w-3xl text-sm text-text/80">
        In this section, you will find documents such as our data access policy,
        Steering Committee and Data Access Committee Terms of Reference and many
        more.
      </p>
      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-text/80">
        <p className="font-semibold text-primary">Data Use Agreement note (presentation text)</p>
        <p className="mt-1">
          Publications or presentations using approved HDRWA datasets should cite listed DOIs (if any) and include:
          "This research includes data obtained through a request to the Health Data Research West Africa (HDRWA)
          https://www.hdrwa.org/access-data. HDRWA had no role in the production of this research".
        </p>
        <p className="mt-1">
          Omit the final sentence when HDRWA staff collaborate in analysis/publication. For dataset questions:
          info@hdrwa.org. DAC-approved applications are documented under Schedule 2.
        </p>
      </div>
      <ul className="mt-6 space-y-2 text-sm text-primary">
        {docs.map((d) => (
          <li
            key={d.name}
            className="flex items-center justify-between rounded-xl border border-section bg-white px-4 py-3"
          >
            <span>{d.name}</span>
            {d.fileName ? (
              <a
                href={`${docsBaseUrl}${encodeURIComponent(d.fileName)}`}
                className="rounded-full border border-primary/30 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/5"
              >
                Download
              </a>
            ) : (
              <span className="rounded-full border border-section px-3 py-1 text-[11px] text-text/50">
                Coming soon
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

