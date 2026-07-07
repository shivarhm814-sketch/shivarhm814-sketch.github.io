import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5

export default function ImageLightbox({ src, alt, onClose }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const imgRef = useRef(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const panStart = useRef({ x: 0, y: 0 })

  const canPan = zoom > MIN_ZOOM

  function clampPan(next, z) {
    const el = imgRef.current
    if (!el) return next
    const maxX = Math.max(0, (el.offsetWidth * z - window.innerWidth) / 2)
    const maxY = Math.max(0, (el.offsetHeight * z - window.innerHeight) / 2)
    return {
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    }
  }

  function changeZoom(next) {
    setZoom((z) => {
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, typeof next === 'function' ? next(z) : next))
      if (clamped <= MIN_ZOOM) setPan({ x: 0, y: 0 })
      else setPan((p) => clampPan(p, clamped))
      return clamped
    })
  }

  function startDrag(clientX, clientY) {
    if (!canPan) return
    setDragging(true)
    dragStart.current = { x: clientX, y: clientY }
    panStart.current = pan
  }
  function moveDrag(clientX, clientY) {
    if (!dragging) return
    setPan(clampPan({
      x: panStart.current.x + (clientX - dragStart.current.x),
      y: panStart.current.y + (clientY - dragStart.current.y),
    }, zoom))
  }
  function endDrag() {
    setDragging(false)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') changeZoom((z) => z + ZOOM_STEP)
      if (e.key === '-') changeZoom((z) => z - ZOOM_STEP)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center p-6"
        style={{ background: 'rgba(15,15,25,.88)', zIndex: 200 }}
        onClick={onClose}
        onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={endDrag}
      >
        <button
          type="button"
          aria-label="بستن"
          onClick={onClose}
          className="absolute flex items-center justify-center text-white font-bold"
          style={{
            top: 18, left: 18, width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,.14)', border: 'none', fontSize: 20, cursor: 'pointer',
          }}
        >
          ×
        </button>

        <motion.img
          ref={imgRef}
          initial={{ scale: 0.92, opacity: 0, x: 0, y: 0 }}
          animate={{ scale: zoom, opacity: 1, x: pan.x, y: pan.y }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: dragging ? 0 : 0.2 }}
          src={src}
          alt={alt}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY) }}
          onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          style={{
            maxWidth: '90vw', maxHeight: '80vh', borderRadius: 12, userSelect: 'none',
            cursor: canPan ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
          onDoubleClick={(e) => {
            e.stopPropagation()
            changeZoom((z) => (z > MIN_ZOOM ? MIN_ZOOM : MIN_ZOOM + ZOOM_STEP * 2))
          }}
        />

        {/* دکمه‌های زوم */}
        <div
          className="absolute flex items-center gap-2"
          style={{ bottom: 24, left: '50%', transform: 'translateX(-50%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="کوچک‌ کردن تصویر"
            disabled={zoom <= MIN_ZOOM}
            onClick={() => changeZoom((z) => z - ZOOM_STEP)}
            className="flex items-center justify-center font-bold"
            style={{
              width: 40, height: 40, borderRadius: '50%', fontSize: 20,
              background: 'rgba(255,255,255,.92)', color: '#3A34A8', border: 'none',
              cursor: zoom <= MIN_ZOOM ? 'not-allowed' : 'pointer',
              opacity: zoom <= MIN_ZOOM ? 0.4 : 1,
            }}
          >
            −
          </button>
          <span
            className="text-white font-semibold"
            style={{ fontSize: 13, minWidth: 44, textAlign: 'center' }}
          >
            {Math.round(zoom * 100)}٪
          </span>
          <button
            type="button"
            aria-label="بزرگ کردن تصویر"
            disabled={zoom >= MAX_ZOOM}
            onClick={() => changeZoom((z) => z + ZOOM_STEP)}
            className="flex items-center justify-center font-bold"
            style={{
              width: 40, height: 40, borderRadius: '50%', fontSize: 20,
              background: 'rgba(255,255,255,.92)', color: '#3A34A8', border: 'none',
              cursor: zoom >= MAX_ZOOM ? 'not-allowed' : 'pointer',
              opacity: zoom >= MAX_ZOOM ? 0.4 : 1,
            }}
          >
            +
          </button>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
