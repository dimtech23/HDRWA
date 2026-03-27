import { useQuery } from '@tanstack/react-query'
import { partnersApi } from '../../services/api/partners'

export function PartnersPage() {
  const { data: partnersDonors = [], isLoading } = useQuery({
    queryKey: ['partners-donors'],
    queryFn: partnersApi.listPartnersDonors,
  })

  return (
    <div className="min-h-0 w-full px-6 py-12 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px]">
        <h1 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
          Partners and donors
        </h1>
        <p className="mt-2 max-w-3xl text-base text-text/80">
          HDRWA is proud to collaborate with a diverse network of partners and
          donors who share our commitment in advancing health data research in
          West Africa.
        </p>

        <section className="mt-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] md:grid-cols-2 md:items-stretch">
            <div className="flex">
              <div className="w-full overflow-hidden rounded-2xl border border-section bg-section/60 shadow-sm">
                <img
                  src={encodeURI('/Dembo Kanteh.png')}
                  alt="Dembo Kanteh"
                  loading="lazy"
                  className="h-[290px] w-full object-cover object-top sm:h-[320px] lg:h-[360px]"
                />
              </div>
            </div>

            <blockquote className="rounded-2xl border border-section bg-white p-8 shadow-sm">
              <p className="text-base italic leading-relaxed text-text/80">
                &quot;We express our deepest gratitude to the partners who have
                been instrumental in our journey. Your support, collaboration,
                and commitment have been crucial to our success, and we are
                profoundly thankful for the impact you have made.&quot;
              </p>
              <p className="mt-4 text-sm font-semibold text-primary">
                Dembo Kanteh, Compliance Manager, WANETAM
              </p>
            </blockquote>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-primary sm:text-2xl">
            Our collaborators
          </h2>

          <div
            className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            aria-label="Partner and donor logos"
          >
            {isLoading ? (
              <div className="rounded-xl border border-dashed border-section bg-white/80 p-4 text-xs text-text/70 sm:col-span-2 md:col-span-3 lg:col-span-5">
                Loading partners and donors…
              </div>
            ) : partnersDonors.length === 0 ? (
              <div className="rounded-xl border border-dashed border-section bg-white/80 p-4 text-xs text-text/70 sm:col-span-2 md:col-span-3 lg:col-span-5">
                No partners or donors have been added yet.
              </div>
            ) : (
              partnersDonors.map((p) => {
                const logoSrc = p.logoPath.startsWith('/') ? p.logoPath : `/${p.logoPath}`
                return (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-[185px] flex-col items-center justify-center gap-3 rounded-2xl border border-section bg-white px-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-section/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <img
                      src={encodeURI(logoSrc)}
                      alt={p.name}
                      loading="lazy"
                      className="h-14 w-full max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="text-sm font-semibold leading-snug text-text/80">
                      {p.name}
                    </span>
                  </a>
                )
              })
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

