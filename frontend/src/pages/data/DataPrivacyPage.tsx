export function DataPrivacyPage() {
  return (
    <div className="px-4 py-10 lg:px-8 lg:py-12">
      <h1 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
        Data privacy and ethical standards
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-text/80">
        At the Health Data Research West Africa (HDRWA), we are committed to
        safeguarding the privacy and security of all personal data we handle.
        We only collect, use and share health research data that has scientific
        validity and has been obtained with consent from individuals who
        participated in studies.
      </p>
      <div className="mt-6 space-y-4 text-sm text-text/80">
        <section>
          <h2 className="font-heading text-base font-semibold text-primary">
            1. Ethical data collection and consent
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
            <li>We only collect health research data that is scientifically valid.</li>
            <li>Data collection is conducted with the full informed consent of participants.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-heading text-base font-semibold text-primary">
            2. Pseudonymisation process
          </h2>
          <p className="mt-2 text-xs">
            Before any data is shared, we remove all personally identifiable
            information through pseudonymisation so that data cannot be traced
            back to individuals.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-base font-semibold text-primary">
            3. Secure data storage
          </h2>
          <p className="mt-2 text-xs">
            De-identified data is stored on protected servers. Access is granted
            only through a controlled application process reviewed by the Data
            Access Committee.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-base font-semibold text-primary">
            4. Data transfer and encryption
          </h2>
          <p className="mt-2 text-xs">
            We use secure channels to transfer data and encryption both in
            transit and at rest to ensure maximum protection.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-base font-semibold text-primary">
            5. Data use agreements
          </h2>
          <p className="mt-2 text-xs">
            Recipients of data must sign a Data Use Agreement which sets out
            their obligations and responsibilities.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-base font-semibold text-primary">
            6. Compliance with laws and best practices
          </h2>
          <p className="mt-2 text-xs">
            Our platform adheres to GDPR and other relevant laws, and follows
            best practices in data privacy and security to ensure the highest
            level of protection for health research data.
          </p>
        </section>
      </div>
    </div>
  )
}

