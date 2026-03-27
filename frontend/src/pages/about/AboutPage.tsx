import { Link } from 'react-router-dom'

// These image paths reference files placed in `frontend/public/`.
// (They may differ from the original /about/... filenames if images were renamed during upload.)
const ABOUT_IMAGE = '/Doctor injecting patient.jpg'

const HOW_WE_HANDLE_CARDS = [
  {
    title: 'Why Share Your Data?',
    href: '/data/benefits',
    image: '/Group of scientists.jpg',
  },
  {
    title: 'Data Privacy, Security and Ethics',
    href: '/data/privacy',
    image: '/data privacy.png',
  },
  {
    title: 'Data Management',
    href: '/resources/data-management',
    image: '/Data management picture.jpg',
  },
]

const CARD_IMAGE_HEIGHT = 230

const OBJECTIVES = [
  'Promote secure and ethical sharing of health research data',
  'Strengthen collaboration across institutions in West Africa',
  'Support high-quality research and innovation',
  'Enable data-driven policy and decision-making',
  'Improve health outcomes through better evidence',
]

export function AboutPage() {
  return (
    <div className="w-full px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px] text-left">
        <header>
          <h1 className="font-heading heading-line-height text-2xl font-semibold text-primary sm:text-3xl">
            Context
          </h1>
          <p className="mt-4 w-full max-w-full text-base leading-[1.7] text-text/80">
            Scientific research depends on the effective collection, sharing, and use of data to advance knowledge and improve health outcomes. However, despite increasing recognition of its importance, many researchers remain hesitant to share their data due to concerns around ownership, misuse, and lack of proper infrastructure.
          </p>
          <p className="mt-4 w-full max-w-full text-base leading-[1.7] text-text/80">
            This limitation slows down scientific progress and weakens the development of evidence-based policies and interventions. The Health Data Research West Africa (HDRWA) platform addresses this challenge by providing a secure, trusted, and collaborative environment for storing, managing, and sharing health research data across the region.
          </p>
        </header>

        <section className="mt-14">
          <h2 className="mb-6 font-heading heading-line-height text-xl font-semibold text-primary sm:text-2xl">
            About HDRWA
          </h2>
          <div className="grid gap-8 items-stretch lg:grid-cols-[1.1fr,minmax(320px,0.9fr)] lg:gap-12">
            <div>
              <p className="text-base leading-[1.7] text-text/80">
                The Health Data Research West Africa (HDRWA) platform was established by the West African Network for TB, AIDS and Malaria (WANETAM) and is supported by the European and Developing Countries Clinical Trials Partnership (EDCTP).
              </p>
              <p className="mt-3 text-base leading-[1.7] text-text/80">
                HDRWA aims to strengthen health research capacity across West Africa by enabling secure data sharing and collaboration among researchers, institutions, and policymakers.
              </p>
              <p className="mt-3 text-base leading-[1.7] text-text/80">
                The platform supports a wide range of research areas, including tuberculosis, HIV, malaria, emerging infectious diseases, and non-communicable diseases (NCDs).
              </p>
              <p className="mt-3 text-base leading-[1.7] text-text/80">
                By facilitating the aggregation, curation, and integration of diverse datasets, HDRWA enables large-scale analysis, promotes transparency, and accelerates scientific discovery to improve public health outcomes.
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-xl bg-section/60 aspect-4/3 lg:aspect-video">
              <img
                src={encodeURI(ABOUT_IMAGE)}
                alt="Healthcare and research in action"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 font-heading heading-line-height text-xl font-semibold text-primary sm:text-2xl">
            How We Handle Your Data
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_WE_HANDLE_CARDS.map((card) => (
              <Link
                key={card.href}
                to={card.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-section bg-white shadow-sm transition hover:shadow-md hover:border-primary/20"
              >
                <div
                  className="w-full overflow-hidden bg-section/60"
                  style={{ height: CARD_IMAGE_HEIGHT }}
                >
                  <img
                    src={encodeURI(card.image)}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center justify-end p-5">
                  <span className="inline-block rounded-full border border-section bg-white py-2.5 px-5 text-center text-sm font-medium text-primary group-hover:border-primary/40 group-hover:bg-primary/5">
                    {card.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl border border-section bg-section/60 p-6">
          <h2 className="mb-4 font-heading heading-line-height text-xl font-semibold text-primary sm:text-2xl">
            Our Objectives
          </h2>
          <ul className="space-y-3 text-base leading-[1.7] text-text/80">
            {OBJECTIVES.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
