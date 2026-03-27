import { Link } from 'react-router-dom'

export function Footer() {
  const logoSrc = `${import.meta.env.BASE_URL}hdrwa-logo.png`

  return (
    <footer className="border-t border-section bg-[#1a2e1f] text-white/80">
      <div className="w-full border-b border-white/10 bg-primary/20 px-4 py-5 lg:px-8">
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-white">Subscribe to our newsletter</p>
            <p className="text-[13px] text-white/60">Stay updated with HDRWA news and research</p>
          </div>
          <a
            href="https://wanetam.us8.list-manage.com/subscribe?u=965485695de125c41c8ed7034&id=85342bf552"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary/80"
          >
            Subscribe
          </a>
        </div>
      </div>

      <div className="w-full px-4 py-8 lg:px-8">
        <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-3 inline-block">
              <img
                src={logoSrc}
                alt="HDRWA"
                className="block h-10 w-auto max-w-[160px] object-contain object-left"
              />
            </div>
            <p className="text-[13px] leading-[1.7] text-white/60">
              A regional platform for secure health data sharing and research collaboration across West Africa.
            </p>
            <p className="mt-3 text-[13px] text-white/40">
              Hosted at the Medical Research Council Unit, The Gambia (MRCG).
            </p>
            <a
              href="mailto:info@hdrwa.org"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-white/80 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@hdrwa.org
            </a>
          </div>

          <div>
            <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-white/40">Contact & Policies</h4>
            <ul className="space-y-2">
              {[
                { label: 'Contact us', to: 'mailto:info@hdrwa.org', external: true },
                { label: 'Data Privacy & Ethical Standards', to: '/data/privacy' },
                { label: 'Governance Structure', to: '/resources/governance-structure' },
                { label: 'Data Management', to: '/resources/data-management' },
                { label: 'Q&A', to: '/qa' },
              ].map(l => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.to} className="text-[13px] text-white/60 hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="text-[13px] text-white/60 hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 w-full border-t border-white/10 pt-5 text-center text-[13px] text-white/30">
          © {new Date().getFullYear()} Health Data Research West Africa (HDRWA). All rights reserved.
          <span className="mx-2">·</span>
          This project is part of the EDCTP 2 Programme funded by the European Union.
        </div>
      </div>
    </footer>
  )
}