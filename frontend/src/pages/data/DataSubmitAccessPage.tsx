import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { datasetsApi } from '../../services/api/datasets'
import { DatasetCard } from '../../components/cards/DatasetCard'

export function DataSubmitAccessPage() {
  const [country, setCountry] = useState('')
  const [institution, setInstitution] = useState('')
  const [topic, setTopic] = useState('')
  const { data: datasets = [] } = useQuery({
    queryKey: ['datasets'],
    queryFn: datasetsApi.listDatasets,
  })

  const countries = useMemo(
    () => Array.from(new Set(datasets.map((d) => d.country))).sort(),
    [datasets],
  )
  const institutions = useMemo(
    () => Array.from(new Set(datasets.map((d) => d.institution))).sort(),
    [datasets],
  )

  const filtered = useMemo(
    () =>
      datasets.filter((d) => {
        if (country && d.country !== country) return false
        if (institution && d.institution !== institution) return false
        if (topic && d.topic !== topic) return false
        return true
      }),
    [country, institution, topic, datasets],
  )

  return (
    <div className="px-4 py-10 lg:px-8 lg:py-12">
      <h1 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
        Submit and access data
      </h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/catalogue"
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/90"
        >
          Browse data catalogue
        </Link>
        <Link
          to="/login"
          className="rounded-full border border-primary/30 bg-white px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/5"
        >
          Login for governed access
        </Link>
      </div>

      <section className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-section bg-white p-4 text-sm">
          <h2 className="font-heading text-base font-semibold text-primary">
            Submit data
          </h2>
          <p className="mt-2 text-text/80">
            We promote and invite the contributions of health research datasets
            from the research and healthcare communities to answer more research
            questions from these aggregated datasets, address knowledge gaps and
            improve healthcare with a greater understanding of diseases.
          </p>
          <p className="mt-2 text-text/80">
            The data we receive is processed and hosted using FAIR principles to
            enable Findability, Accessibility, Interoperability and
            Reusability. We ensure the pseudonymisation of your data to remove
            all personal identifiable information and store the data securely on
            our platform. We assign a DOI to the data for academic credits and
            direct citation to acknowledge your works and increase your academic
            metrics.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs text-text/85">
            <li>Register or login to the HDRWA website.</li>
            <li>Click to &apos;Submit new data&apos;.</li>
            <li>
              Complete the requested information about your dataset, review the
              Data Privacy Policy, the Data Governance Document (Data Use Agreement), and accept the Terms of Submission.
            </li>
            <li>
              Our team will then email you to explain how to upload your data
              files into our repository.
            </li>
          </ol>
        </div>

        <div className="rounded-xl border border-section bg-white p-4 text-sm">
          <h2 className="font-heading text-base font-semibold text-primary">
            Access data
          </h2>
          <p className="mt-2 text-text/80">
            Access to scientific research data is essential for researchers to
            continue advancing their field. HDRWA aims to maximise the outputs
            of research from the diverse and rich datasets held by African
            researchers by aggregating these datasets and providing managed
            access to improve science.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs text-text/85">
            <li>View data held in the HDRWA Data Inventory.</li>
            <li>Register or Login.</li>
            <li>Complete the Researcher Form (Access request).</li>
            <li>
              Complete the requested information about your request. The Data
              Access Guideline is available as optional guidance, while the Data
              Use Agreement is mandatory before release after DAC approval.
            </li>
          </ol>
          <p className="mt-2 text-xs text-text/75">
            Timing: Data Access Guideline can be viewed when needed at any stage;
            Data Use Agreement is compulsory after DAC approval and before data
            release.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-section bg-section/50 p-4 text-xs">
          <h3 className="font-heading text-sm font-semibold text-primary">
            Once you have submitted your data
          </h3>
          <p className="mt-2 text-text/80">
            Our Data Managers will process the data to the standardised
            structure. It will then be encrypted, transferred, and stored
            securely into our high compliance server. They may contact you with
            questions about the data and will provide you with a copy of the
            processed data set when complete.
          </p>
        </div>
        <div className="rounded-xl border border-section bg-section/50 p-4 text-xs">
          <h3 className="font-heading text-sm font-semibold text-primary">
            Once your data request has been submitted
          </h3>
          <p className="mt-2 text-text/80">
            The Data Access Committee (DAC) will review your application and
            will respond within two months of submission. Once a request is
            approved and data sharing conditions are satisfied (including a
            signed Data Sharing Agreement), the Data Manager can enable
            access/release through a secure channel (sharing occurs outside this
            system). For any enquiry, contact the HDRWA Secretariat at{' '}
            <span className="font-medium">info@hdrwa.org</span>.
          </p>
        </div>
      </section>

      <section className="mt-10 border-t border-section bg-section/60">
        <div className="space-y-4 px-4 py-8 lg:px-8">
          <form
            className="flex flex-col gap-2 rounded-2xl border border-section bg-white p-4 text-xs md:flex-row md:items-end md:gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex-1 space-y-2 md:flex md:space-y-0 md:gap-3">
              <label className="flex-1 text-[11px] font-medium text-text/80">
                <span className="mb-1 block">Country</span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-9 w-full rounded-lg border border-section bg-white px-2 text-xs outline-none ring-primary/20 focus:ring-2"
                >
                  <option value="">All countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex-1 text-[11px] font-medium text-text/80">
                <span className="mb-1 block">Institution</span>
                <select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="h-9 w-full rounded-lg border border-section bg-white px-2 text-xs outline-none ring-primary/20 focus:ring-2"
                >
                  <option value="">All institutions</option>
                  {institutions.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-1 flex-col gap-2 md:flex-row md:gap-3">
              <label className="flex-1 text-[11px] font-medium text-text/80">
                <span className="mb-1 block">Topic</span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-9 w-full rounded-lg border border-section bg-white px-2 text-xs outline-none ring-primary/20 focus:ring-2"
                >
                  <option value="">All topics</option>
                  <option value="Tuberculosis">Tuberculosis</option>
                  <option value="Malaria">Malaria</option>
                  <option value="HIV">HIV</option>
                  <option value="NCDs">NCDs</option>
                  <option value="Re-emerging Infections">Re-emerging Infections</option>
                </select>
              </label>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <button
                type="submit"
                className="h-9 rounded-full bg-primary px-5 text-xs font-medium text-white shadow-sm hover:bg-primary/90"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setCountry('')
                  setInstitution('')
                  setTopic('')
                }}
                className="text-[11px] font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between text-xs text-text/80">
            <span className="font-semibold text-text">
              {filtered.length} {filtered.length === 1 ? 'Dataset' : 'Datasets'}
            </span>
            <Link
              to="/catalogue"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all datasets →
            </Link>
          </div>

          {filtered.length === 0 ? (
            <p className="text-xs text-text/70">
              No datasets match the selected filters. Adjust the filters to see available
              datasets.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {filtered.map((d) => (
                <DatasetCard key={d.id} {...d} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

