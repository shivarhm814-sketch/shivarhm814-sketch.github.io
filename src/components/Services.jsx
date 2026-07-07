import { motion } from 'framer-motion'
import { useServices } from '../hooks/useServices'
import ServiceCard from './ServiceCard'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

export default function Services() {
  const { services, loading } = useServices()

  return (
    <section id="services" className="py-16 px-7" style={{ background: '#F7F7FB' }}>
      <div className="mx-auto" style={{ maxWidth: 1140 }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
          className="text-center mb-12"
        >
          <p className="text-accent-500 font-bold mb-2" style={{ fontSize: 13 }}>خدمات</p>
          <h2 className="font-display text-ink-900" style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.25 }}>
            چه کمکی می‌توانم بکنم؟
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-ink-200" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        )}
      </div>
    </section>
  )
}
