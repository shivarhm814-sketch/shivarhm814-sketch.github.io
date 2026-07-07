import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '../hooks/usePortfolio'
import PortfolioCard from './PortfolioCard'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

const FILTERS = [
  { key: 'all',        label: 'همه' },
  { key: 'web-design', label: 'طراحی وب' },
  { key: 'app-design', label: 'طراحی اپ' },
  { key: 'ai-photo',   label: 'تصویر هوشمند' },
]

export default function Portfolio() {
  const { items, loading } = usePortfolio()
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? items
    : items.filter((i) => (Array.isArray(i.category) ? i.category.includes(active) : i.category === active))

  return (
    <section id="portfolio" className="py-16 px-7 bg-white">
      <div className="mx-auto" style={{ maxWidth: 1140 }}>
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
              className="font-semibold transition-all duration-200"
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
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => <div key={i} className="rounded-2xl h-72 animate-pulse" style={{ background: '#EEEEFC' }} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => <PortfolioCard key={item.id} item={item} index={i} />)}
          </div>
        )}
      </div>
    </section>
  )
}
