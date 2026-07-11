import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'
import PortfolioCard from './PortfolioCard'
import FeaturedProject from './FeaturedProject'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

const ICONS = {
  all: (
    <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor">
      <circle cx="12" cy="12" r="12" />
    </svg>
  ),
  'web-design': (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </svg>
  ),
  'app-design': (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.2h2" />
    </svg>
  ),
  'ai-photo': (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="7" width="19" height="13" rx="2.5" />
      <path d="M8 7l1.4-2.5h5.2L16 7" />
      <circle cx="12" cy="13.5" r="3.3" />
    </svg>
  ),
}

const FILTERS = [
  { key: 'all',        label: 'همه' },
  { key: 'web-design', label: 'طراحی سایت' },
  { key: 'app-design', label: 'اپلیکیشن' },
  { key: 'ai-photo',   label: 'عکاسی' },
]

const FEATURED_ID = 'project-5'

export default function Portfolio() {
  const { items, loading } = usePortfolio()
  const [active, setActive] = useState('all')

  const featured = items.find((i) => i.id === FEATURED_ID)
  const rest = active === 'all' ? items.filter((i) => i.id !== FEATURED_ID) : items

  const filtered = active === 'all'
    ? rest
    : rest.filter((i) => (Array.isArray(i.category) ? i.category.includes(active) : i.category === active))

  return (
    <section id="portfolio" className="py-16 px-7 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff 0%, #FBFAFF 100%)' }}>
      {/* اشکال محو تزئینی پس‌زمینه */}
      <div className="absolute pointer-events-none" style={{ top: -80, left: -80, width: 340, height: 340, borderRadius: '50%', background: '#5B54E8', opacity: .03 }} />
      <div className="absolute pointer-events-none" style={{ bottom: -100, right: -60, width: 300, height: 300, borderRadius: '50%', background: '#FF7A59', opacity: .03 }} />
      <svg className="absolute pointer-events-none" style={{ top: '38%', left: 0, width: '100%', height: 200, opacity: .05 }} viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0,100 C300,180 900,20 1200,100" fill="none" stroke="#5B54E8" strokeWidth="2" />
      </svg>

      <div className="mx-auto relative" style={{ maxWidth: 1140 }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
          className="text-center mb-10"
        >
          <p className="text-accent-500 font-bold mb-2" style={{ fontSize: 13 }}>نمونه کارها</p>
          <h2 className="font-display text-ink-900" style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.25 }}>
            پروژه‌های اخیر
          </h2>
        </motion.div>

        {/* فیلترها */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="font-semibold transition-all duration-200 inline-flex items-center gap-1.5"
              style={{
                padding: '7px 18px', borderRadius: 999, fontSize: 13,
                background: active === f.key ? 'linear-gradient(135deg, #9E74E4 0%, #6A46C4 100%)' : '#EEEEFC',
                color:      active === f.key ? '#fff'    : '#3A34A8',
                border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (active !== f.key) e.currentTarget.style.background = 'linear-gradient(135deg, #9E74E4 0%, #6A46C4 100%)'
                if (active !== f.key) e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                if (active !== f.key) e.currentTarget.style.background = '#EEEEFC'
                if (active !== f.key) e.currentTarget.style.color = '#3A34A8'
              }}
            >
              <span className="flex items-center">{ICONS[f.key]}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3" style={{ gap: 24 }}>
            {[1,2,3].map((i) => <div key={i} className="rounded-2xl h-72 animate-pulse" style={{ background: '#EEEEFC' }} />)}
          </div>
        ) : (
          <>
            {featured && active === 'all' && <FeaturedProject item={featured} />}
            <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
              {filtered.map((item, i) => <PortfolioCard key={item.id} item={item} index={i} />)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
