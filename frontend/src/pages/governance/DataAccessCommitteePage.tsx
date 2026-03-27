import { Link } from 'react-router-dom'
import { dataAccessMembers } from '../../data/dataAccessCommittee'

export function DataAccessCommitteePage() {
  return (
    <div className="min-h-0 w-full px-6 py-12 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px]">
        <header className="text-left">
          <h1 className="font-heading heading-line-height text-2xl font-semibold text-primary sm:text-3xl">
            HDRWA Data Access Committee
          </h1>

          <div className="mt-4 w-full max-w-full space-y-4 text-base leading-[1.7] text-text/80">
            <p>
              The HDRWA Data Access Committee (DAC) is an independent decision-making
              body that provides guidance and oversight on the data hosted within the
              platform. The DAC ensures that the highest standards of security and
              privacy are maintained whilst facilitating the ethical, equitable and
              rapid access to data.
            </p>
            <p>
              The DAC members, appointed by the Steering Committee must abide by the
              Conflict of Interest Policy and the rest of the governance framework of
              the Platform as well as operate according to a Terms of Reference. They
              are responsible for granting data access to requestors in compliance
              with the Data Access Guideline and the Data Use Agreement.
            </p>
          </div>
        </header>

        <section className="mt-14 w-full" aria-label="Committee members">
          <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {dataAccessMembers.map((member) => (
              <Link
                key={member.slug}
                to={`/governance/data-access-committee/${member.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-section bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div className="relative h-[310px] w-full overflow-hidden bg-section/60">
                  <img
                    src={encodeURI(member.image)}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 text-left">
                  <h2 className="font-heading heading-line-height text-xl font-semibold text-primary group-hover:underline">
                    {member.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-base leading-[1.7] text-text/80">
                    {member.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

