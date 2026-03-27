export function DataBenefitsPage() {
  const sections = [
    {
      title: 'Increased visibility',
      body:
        'Sharing your datasets on our platform increases the visibility of your research and expands its reach to a wider audience of researchers and practitioners.',
    },
    {
      title: 'Collaboration opportunities',
      body:
        'By sharing your data, you open doors to potential collaborations with other researchers who may find value in your work.',
    },
    {
      title: 'Contribution to science',
      body:
        'Sharing your datasets contributes to the collective body of scientific knowledge and facilitates the advancement of research in your field.',
    },
    {
      title: 'Recognition and impact',
      body:
        'Sharing your data promotes transparency in research and may lead to increased citations, collaborations, and recognition within the research community.',
    },
    {
      title: 'Compliance and funding requirements',
      body:
        'Many funding agencies and journals require researchers to share their data as a condition of publication or grant funding.',
    },
    {
      title: 'Privacy and security',
      body:
        'We prioritize the privacy and security of your data and use industry-standard encryption and security protocols.',
    },
    {
      title: 'Attribution and licensing',
      body:
        'We respect intellectual property rights and ensure proper attribution of datasets shared on our platform. The data remains the exclusive property of the data contributor.',
    },
    {
      title: 'Quality assurance',
      body:
        'All datasets undergo validation and auditing to ensure accuracy, consistency, and completeness, enabling trustworthy research outcomes.',
    },
  ]

  return (
    <div className="px-4 py-10 lg:px-8 lg:py-12">
      <h1 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
        Benefits of sharing your data
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-text/80">
        Sharing scientific research data is crucial for advancing scientific
        knowledge and promoting transparency and collaboration. It allows other
        researchers to build upon existing work and develop new insights and
        breakthroughs.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <article
            key={s.title}
            className="rounded-xl border border-section bg-white p-4 text-sm"
          >
            <h2 className="font-heading text-base font-semibold text-primary">
              {s.title}
            </h2>
            <p className="mt-2 text-text/80">{s.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

