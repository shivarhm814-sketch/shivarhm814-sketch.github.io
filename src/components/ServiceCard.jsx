import { motion } from 'framer-motion'

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-7 border border-ink-200 cursor-default transition-shadow duration-300 hover:shadow-card"
      style={{ boxShadow: '0 8px 18px rgba(91,84,232,.08)' }}
    >
      {/* آیکون */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{ background: '#FFE7E0' }}
      >
        {service.icon}
      </div>

      <h3 className="text-ink-900 mb-2" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>
        {service.title}
      </h3>
      <p className="text-ink-500 mb-5" style={{ fontSize: 14.5, lineHeight: 1.85 }}>
        {service.description}
      </p>

      <ul className="flex flex-col gap-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-ink-500" style={{ fontSize: 13.5 }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF7A59' }} />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
