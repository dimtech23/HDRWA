import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const HERO_SLIDES = [
  { title: 'Our Mission', to: '/about' },
  { title: 'Share Your Data With Us', to: '/data/submit' },
  { title: 'Access Data', to: '/data/access' },
  { title: 'Q&A', to: '/qa' },
  { title: 'Debunking Myths and Fears Associated with Data Sharing', to: '/data/benefits' },
] as const

export function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    heroIntervalRef.current = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current)
    }
  }, [])

  const goToSlide = (index: number) => {
    const next = ((index % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length
    setHeroIndex(next)
    if (heroIntervalRef.current) {
      clearInterval(heroIntervalRef.current)
      heroIntervalRef.current = setInterval(() => {
        setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
      }, 5000)
    }
  }

  const goPrev = () => goToSlide(heroIndex - 1)
  const goNext = () => goToSlide(heroIndex + 1)

  return (
    <div className="bg-background">
      <section
        className="relative flex min-h-[calc(100vh-6rem)] overflow-hidden bg-linear-to-br from-primary/10 via-background to-secondary/10"
        onMouseEnter={() => {
          if (heroIntervalRef.current) {
            clearInterval(heroIntervalRef.current)
            heroIntervalRef.current = null
          }
        }}
        onMouseLeave={() => {
          heroIntervalRef.current = setInterval(() => {
            setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
          }, 5000)
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(95,158,127,0.3),transparent_55%)]" />
        <button
          type="button"
          aria-label="Previous slide"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-section bg-white/90 text-primary shadow-md transition hover:bg-white hover:shadow-lg lg:left-4 lg:h-12 lg:w-12"
        >
          <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-section bg-white/90 text-primary shadow-md transition hover:bg-white hover:shadow-lg lg:right-4 lg:h-12 lg:w-12"
        >
          <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="relative flex w-full flex-1 flex-col items-center justify-center px-4 py-12 text-center lg:px-8 lg:py-20 lg:text-left">
          <div className="relative min-h-[200px] w-full max-w-3xl sm:min-h-[240px]">
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={slide.to}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-500 lg:items-start"
                style={{
                  opacity: i === heroIndex ? 1 : 0,
                  pointerEvents: i === heroIndex ? 'auto' : 'none',
                }}
              >
                <h1 className="font-heading text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  <Link
                    to={slide.to}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                  >
                    Discover More
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  {slide.to === '/data/access' && (
                    <Link
                      to="/catalogue"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-white/90 px-6 py-2.5 text-sm font-medium text-primary shadow-sm hover:bg-white"
                    >
                      Browse catalogue
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 lg:bottom-8">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === heroIndex ? 'w-6 bg-primary' : 'w-2 bg-primary/40 hover:bg-primary/60'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="w-full border-t border-section bg-white">
        <div className="mx-auto w-full max-w-[1320px] px-6 py-14 lg:px-10 lg:py-16">
          <div className="grid items-stretch gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="relative order-2 min-h-[280px] w-full overflow-hidden rounded-2xl border border-section bg-black shadow-lg ring-1 ring-black/5 lg:order-1">
              <div className="aspect-video w-full">
                <iframe
                  title="Health Data Research West Africa overview"
                  src="https://www.youtube.com/embed/ocratOMvgbQ"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-5 py-3 text-[13px] text-white/90">
                Secure, transparent access to health data
              </p>
            </div>
            <div className="flex order-1 flex-col justify-center text-left lg:order-2 lg:pl-2">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-primary/80">
                About the platform
              </span>
              <h2 className="mt-2 font-heading heading-line-height text-2xl font-semibold text-primary sm:text-3xl lg:text-4xl">
                What is HDRWA?
              </h2>
              <p className="mt-4 text-base leading-[1.7] text-text/85">
                The Health Data Research West Africa platform (HDRWA) is a data repository
                and sharing platform established with a governance framework hosted at the
                Medical Research Council Unit The Gambia (MRCG). It securely hosts health
                research data and enables data access to researchers who can use the data
                for novel research analysis.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
              >
                Discover More
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-section bg-section/40">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-14 lg:px-10 lg:py-16">
          <div className="mb-10 text-left">
            <span className="text-[13px] font-semibold uppercase tracking-wider text-primary/80">
              Why use HDRWA
            </span>
            <h2 className="mt-2 font-heading heading-line-height text-2xl font-semibold text-primary sm:text-3xl">
              Built for collaboration and compliance
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <article className="group flex flex-col rounded-2xl border border-section bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 text-left">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading heading-line-height text-lg font-semibold text-primary">
                Why HDR West Africa?
              </h3>
              <p className="mt-2 flex-1 text-base leading-[1.7] text-text/80">
                Strengthens cross-country collaboration, reduces duplication, and
                accelerates high-impact health research.
              </p>
            </article>
            <article className="group flex flex-col rounded-2xl border border-section bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 text-left">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-heading heading-line-height text-lg font-semibold text-primary">
                FAIR data by design
              </h3>
              <p className="mt-2 flex-1 text-base leading-[1.7] text-text/80">
                Metadata templates, governance workflows, and documentation to
                support FAIR-aligned data assets.
              </p>
            </article>
            <article className="group flex flex-col rounded-2xl border border-section bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 text-left sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-heading heading-line-height text-lg font-semibold text-primary">
                Secure request workflows
              </h3>
              <p className="mt-2 flex-1 text-base leading-[1.7] text-text/80">
                Role-based review for access requests, aligned with ethics and
                governance requirements.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

