import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageLightbox from './ImageLightbox'

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="450"%3E%3Crect width="600" height="450" fill="%23DDDCEC"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239A9AAA" font-size="16" font-family="sans-serif"%3Eنمونه کار%3C/text%3E%3C/svg%3E'

export default function FeaturedProject({ item }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="bg-white overflow-hidden grid md:grid-cols-2"
      style={{ borderRadius: '24px 24px 8px 24px', border: '1px solid #F1ECFF', marginBottom: 24 }}
    >
      {/* عکس */}
      <div
        className="relative overflow-hidden cursor-pointer group"
        style={{ aspectRatio: '4/3', minHeight: 280 }}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={item.image || PLACEHOLDER}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
        />
        <span
          className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            top: 16, left: 16, width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,.92)', color: '#3A34A8', fontSize: 16,
          }}
        >
          ←
        </span>
      </div>

      {/* متن */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <span
          className="inline-flex items-center gap-1.5 font-bold self-start mb-4"
          style={{
            background: 'linear-gradient(135deg, #9E74E4 0%, #6A46C4 100%)', color: '#fff',
            fontSize: 12, padding: '6px 14px', borderRadius: 999,
          }}
        >
          ★ پروژه ویژه
        </span>

        <h3 className="text-ink-900 font-bold mb-3" style={{ fontSize: 24 }}>{item.title}</h3>
        <p className="text-ink-500 mb-5" style={{ fontSize: 15, lineHeight: 1.9 }}>{item.description}</p>

        <div className="mb-7">
          <p className="text-ink-400 font-semibold mb-2" style={{ fontSize: 12 }}>خدمات انجام‌شده</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t} className="font-semibold"
                style={{ background: '#EEEEFC', color: '#3A34A8', fontSize: 12.5, padding: '5px 12px', borderRadius: 999 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="text-white font-bold"
            style={{
              background: '#FF7A59', padding: '12px 24px', borderRadius: 14,
              boxShadow: '0 8px 20px rgba(255,122,89,.35)', fontSize: 14.5, border: 'none', cursor: 'pointer',
            }}
          >
            مشاهده پروژه
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          src={item.image || PLACEHOLDER}
          alt={item.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </motion.article>
  )
}
