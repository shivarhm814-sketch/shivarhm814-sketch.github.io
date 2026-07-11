import { motion } from 'framer-motion'

const ICONS = {
  'web-design': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FF7A59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </svg>
  ),
  'app-design': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FF7A59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.2h2" />
    </svg>
  ),
  'ai-photo': (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FF7A59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5l1.6 3.9 3.9 1.6-3.9 1.6L12 14.5l-1.6-3.9-3.9-1.6 3.9-1.6L12 3.5z" />
      <path d="M18.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
    </svg>
  ),
}

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
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: '#FFE7E0' }}
      >
        {ICONS[service.id]}
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
