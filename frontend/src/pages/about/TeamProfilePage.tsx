import { useParams, Link, Navigate } from 'react-router-dom'
import { getTeamMemberBySlug } from '../../data/team'

export function TeamProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const member = slug ? getTeamMemberBySlug(slug) : undefined

  if (!member) {
    return <Navigate to="/team" replace />
  }

  const paragraphs = member.bio.split(/\n\n+/).filter(Boolean)

  return (
    <div className="px-4 py-8 lg:px-8 lg:py-10">
      <Link
        to="/team"
        className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        ← Back to team
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

        {member.links && (member.links.researchGate ?? member.links.linkedIn ?? member.links.twitter) && (
          <div className="mt-8 flex flex-wrap gap-3 border-t border-section pt-6">
            {member.links.researchGate && (
              <a
                href={member.links.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Research Gate
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
