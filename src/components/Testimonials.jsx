import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTestimonials } from '../hooks/useTestimonials'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

function Avatar({ name }) {
  const initial = name?.[0] ?? '؟'
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #5B54E8, #FF7A59)', fontSize: 16 }}
    >
      {initial}
    </div>
  )
}

export default function Testimonials() {
  const { testimonials, loading } = useTestimonials()
  const [current, setCurrent] = useState(0)

  const goTo = (i) => setCurrent(Math.max(0, Math.min(testimonials.length - 1, i)))

  if (loading) return (
    <section className="py-16 px-7" style={{ background: '#F7F7FB' }}>
      <div className="mx-auto" style={{ maxWidth: 1140 }}>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => <div key={i} className="rounded-2xl h-48 animate-pulse bg-white border border-ink-200" />)}
        </div>
      </div>
    </section>
  )

  return (
    <section id="testimonials" className="py-16 px-7" style={{ background: '#F7F7FB' }}>
      <div className="mx-auto" style={{ maxWidth: 1140 }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
          className="text-center mb-12"
        >
          <p className="text-accent-500 font-bold mb-2" style={{ fontSize: 13 }}>نظر مشتریان</p>
          <h2 className="font-display text-ink-900" style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.25 }}>
            مشتریان چه می‌گویند
          </h2>
        </motion.div>

        {/* کارت‌ها — دسکتاپ: همه هم‌زمان / موبایل: اسلایدر با dots */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border shadow-service"
              style={{ borderColor: '#F0F0F5' }}
            >
              {/* ستاره‌ها */}
              <div className="text-accent-500 mb-4" style={{ fontSize: 15, letterSpacing: 2 }}>★★★★★</div>
              <p className="text-ink-700 mb-5" style={{ fontSize: 14.5, lineHeight: 1.85 }}>
                «{t.text}»
              </p>
              <div className="flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <p className="text-ink-900 font-bold" style={{ fontSize: 14, margin: 0 }}>{t.name}</p>
                  <p className="text-ink-400" style={{ fontSize: 12, margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* موبایل — یک کارت با اسلاید راست‌به‌چپ + dots */}
        <div className="md:hidden overflow-hidden">
          <motion.div
            className="flex"
            style={{ direction: 'rtl' }}
            animate={{ x: `${current * 100}%` }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-full flex-shrink-0 px-1">
                <div
                  className="bg-white rounded-2xl p-6 border shadow-service"
                  style={{ borderColor: '#F0F0F5' }}
                >
                  <div className="text-accent-500 mb-4" style={{ fontSize: 15, letterSpacing: 2 }}>★★★★★</div>
                  <p className="text-ink-700 mb-5" style={{ fontSize: 14.5, lineHeight: 1.85 }}>
                    «{t.text}»
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar name={t.name} />
                    <div>
                      <p className="text-ink-900 font-bold" style={{ fontSize: 14, margin: 0 }}>{t.name}</p>
                      <p className="text-ink-400" style={{ fontSize: 12, margin: 0 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ناوبری نقطه‌ای */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                aria-label={`اسلاید ${i + 1}`}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === current ? 20 : 8,
                  height: 8,
                  background: i === current ? '#5B54E8' : '#DCDBF9',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
