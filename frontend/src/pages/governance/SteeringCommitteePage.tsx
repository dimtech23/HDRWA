import { Link } from 'react-router-dom'
import { steeringMembers } from '../../data/steeringCommittee'

export function SteeringCommitteePage() {
  return (
    <div className="min-h-0 w-full px-6 py-12 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px]">
        <header className="text-left">
          <h1 className="font-heading heading-line-height text-2xl font-semibold text-primary sm:text-3xl">
            HDRWA Steering Committee
          </h1>
          <div className="mt-4 w-full max-w-full space-y-4 text-base leading-[1.7] text-text/80">
            <p>
              The Health Data Research West Africa (HDRWA) platform is overseen by a
              Steering Committee (SC), which advises on the strategic direction of the
              platform and provides guidance and support to the HDRWA Secretariat on
              governance, operation, and activity of the Data Access Committee.
            </p>
            <p>
              The members of the Steering Committee promote ethical, transparent,
              fair, and timely access to data according to the highest standards of
              security and confidentiality that recognizes and protects the interests
              of those generating the data and fill knowledge gaps important to those
              affected or at risk from neglected poverty-related diseases and
              emerging infections. The Steering Committee abides by the Terms of
              Reference, the Conflict of Interest Policy and the rest of the
              Platform&apos;s governance framework.
            </p>
          </div>
        </header>

        <section className="mt-14 w-full" aria-label="Committee members">
          <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {steeringMembers.map((member) => (
              <Link
                key={member.slug}
                to={`/governance/steering-committee/${member.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-section bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div className="relative h-[260px] w-full overflow-hidden bg-section/60">
                  <img
                    src={encodeURI(member.image)}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 text-left">
                  <h2 className="font-heading heading-line-height text-lg font-semibold text-primary group-hover:underline">
                    {member.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-[1.7] text-text/80">
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
