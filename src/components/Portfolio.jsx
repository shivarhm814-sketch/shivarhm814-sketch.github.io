import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'
import PortfolioCard from './PortfolioCard'
import FeaturedProject from './FeaturedProject'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

const FILTERS = [
  { key: 'all',        label: 'همه',         icon: '●' },
  { key: 'web-design', label: 'طراحی سایت',   icon: '🌐' },
  { key: 'app-design', label: 'اپلیکیشن',     icon: '📱' },
  { key: 'ai-photo',   label: 'عکاسی',        icon: '📸' },
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
              <span>{f.icon}</span>
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
