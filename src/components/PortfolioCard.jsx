import { useState } from 'react'
import { motion } from 'framer-motion'
import BeforeAfterSlider from './BeforeAfterSlider'
import ImageLightbox from './ImageLightbox'

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23DDDCEC"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239A9AAA" font-size="14" font-family="sans-serif"%3Eنمونه کار%3C/text%3E%3C/svg%3E'

export default function PortfolioCard({ item, index }) {
  const isAI = item.category === 'ai-photo'
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden border shadow-card group"
      style={{ borderColor: '#F0F0F5' }}
    >
      {isAI ? (
        <div className="p-3">
          <BeforeAfterSlider
            before={item.imageBefore}
            after={item.imageAfter}
            altBefore={`${item.title} — قبل`}
            altAfter={`${item.title} — بعد`}
          />
        </div>
      ) : (
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{ aspectRatio: '4/3' }}
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={item.image || PLACEHOLDER}
            alt={item.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
          />

          {/* بج دسته‌بندی روی تصویر */}
          <span
            className="absolute font-semibold"
            style={{
              top: 12, right: 12, background: 'rgba(255,255,255,.92)', color: '#3A34A8',
              fontSize: 11.5, padding: '4px 10px', borderRadius: 999, backdropFilter: 'blur(4px)',
            }}
          >
            {item.tags[0]}
          </span>

          {/* آیکون باز کردن هنگام hover */}
          <span
            className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              top: 12, left: 12, width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,.92)', color: '#3A34A8', fontSize: 15,
            }}
          >
            ←
          </span>

          {/* لایه برند هنگام hover */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, rgba(158,116,228,.88) 0%, rgba(106,70,196,.88) 100%)' }}
          >
            <h3 className="text-white font-bold mb-2" style={{ fontSize: 16 }}>{item.title}</h3>
            <div className="flex flex-wrap gap-1">
              {item.tags.map((t) => (
                <span key={t} className="text-white/80" style={{ fontSize: 11, background: 'rgba(255,255,255,.18)', padding: '3px 9px', borderRadius: 999 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-5">
        {isAI && (
          <span
            className="inline-block font-semibold mb-3"
            style={{ background: '#EEEEFC', color: '#3A34A8', fontSize: 11.5, padding: '4px 10px', borderRadius: 999 }}
          >
            {item.tags[0]}
          </span>
        )}
        <h3 className="text-ink-900 font-bold mb-1" style={{ fontSize: 17 }}>{item.title}</h3>
        <p className="text-ink-500" style={{ fontSize: 13.5, lineHeight: 1.7 }}>{item.description}</p>
      </div>

      {!isAI && lightboxOpen && (
        <ImageLightbox
          src={item.image || PLACEHOLDER}
          alt={item.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </motion.article>
  )
}
