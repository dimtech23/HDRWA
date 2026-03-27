import { useParams, Link, Navigate } from 'react-router-dom'
import { getDataAccessMemberBySlug } from '../../data/dataAccessCommittee'

export function DataAccessCommitteeProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const member = slug ? getDataAccessMemberBySlug(slug) : undefined

  if (!member) {
    return <Navigate to="/governance/data-access-committee" replace />
  }

  const paragraphs = member.bio.split(/\n\n+/).filter(Boolean)

  return (
    <div className="px-4 py-8 lg:px-8 lg:py-10">
      <Link
        to="/governance/data-access-committee"
        className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        ← Back to Data Access Committee
      </Link>

      <article className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          <div className="shrink-0">
            <img
              src={encodeURI(member.image)}
              alt={member.name}
              className="h-44 w-44 rounded-2xl object-cover object-top shadow-md sm:h-52 sm:w-52"
            />
          </div>

          <div className="mt-4 sm:ml-6 sm:mt-0">
            <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              {member.name}
            </h1>
            <p className="mt-1 text-base font-medium text-secondary">{member.role}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-section pt-8">
          {paragraphs.map((para, i) => (
            <p key={i} className="mt-4 first:mt-0 text-base leading-relaxed text-text/90">
              {para}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}

