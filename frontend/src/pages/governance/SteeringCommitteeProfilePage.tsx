import { useParams, Link, Navigate } from 'react-router-dom'
import { getSteeringMemberBySlug } from '../../data/steeringCommittee'

export function SteeringCommitteeProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const member = slug ? getSteeringMemberBySlug(slug) : undefined

  if (!member) {
    return <Navigate to="/governance/steering-committee" replace />
  }

  const paragraphs = member.bio.split(/\n\n+/).filter(Boolean)
  const hasLinks = member.links && (
    member.links.profile ?? member.links.orcid ?? member.links.linkedIn ?? member.links.twitter
  )

  return (
    <div className="px-4 py-8 lg:px-8 lg:py-10">
      <Link
        to="/governance/steering-committee"
        className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        ← Back to Steering Committee
      </Link>

      <article className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          <div className="shrink-0">
            <img
              src={encodeURI(member.image)}
              alt={member.name}
              className="h-40 w-40 rounded-2xl object-cover object-top shadow-md sm:h-48 sm:w-48"
            />
          </div>
          <div className="mt-4 sm:ml-6 sm:mt-0">
            <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              {member.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-secondary">
              {member.role}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-section pt-8">
          {paragraphs.map((para, i) => (
            <p key={i} className="mt-4 first:mt-0 text-sm leading-relaxed text-text/90">
              {para}
            </p>
          ))}
        </div>

        {hasLinks && member.links && (
          <div className="mt-8 flex flex-wrap gap-3 border-t border-section pt-6">
            {member.links.profile && (
              <a
                href={member.links.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Institutional profile
              </a>
            )}
            {member.links.orcid && (
              <a
                href={member.links.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                ORCID
              </a>
            )}
            {member.links.linkedIn && (
              <a
                href={member.links.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                LinkedIn
              </a>
            )}
            {member.links.twitter && (
              <a
                href={member.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Twitter
              </a>
            )}
          </div>
        )}
      </article>
    </div>
  )
}
