import { useState, useRef, useCallback, useEffect } from 'react'

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23e2e8f0"%3E%3Crect width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="16"%3Eتصویر%3C/text%3E%3C/svg%3E'

export default function BeforeAfterSlider({ before, after, altBefore = 'قبل', altAfter = 'بعد' }) {
  const [position, setPosition] = useState(50)
  const [containerWidth, setContainerWidth] = useState(0)
  const [ratio, setRatio] = useState(null)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setContainerWidth(el.offsetWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const move = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onMouseMove = useCallback((e) => { if (dragging.current) move(e.clientX) }, [move])
  const onTouchMove = useCallback((e) => { move(e.touches[0].clientX) }, [move])

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="مقایسه‌ی قبل و بعد"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative w-full rounded-2xl overflow-hidden cursor-col-resize select-none"
      style={{ aspectRatio: ratio || '3/4' }}
      onMouseMove={onMouseMove}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => { dragging.current = false }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 2))
        if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 2))
      }}
      tabIndex={0}
    >
      <img
        src={after || PLACEHOLDER}
        alt={altAfter}
        className="absolute inset-0 w-full h-full object-contain bg-ink-200"
        onLoad={(e) => {
          if (!after) return
          // نسبت ابعاد بین ۰.۶۵ تا ۱ محدود می‌شود تا اندازه‌ی کارت‌ها با هم هماهنگ بماند
          const raw = e.currentTarget.naturalWidth / e.currentTarget.naturalHeight
          const clamped = Math.min(1, Math.max(0.65, raw))
          setRatio(`${clamped}`)
        }}
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={before || PLACEHOLDER}
          alt={altBefore}
          className="absolute inset-0 h-full object-contain bg-ink-200"
          style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
        onMouseDown={() => { dragging.current = true }}
        onTouchStart={() => { dragging.current = true }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold" style={{ color: '#5B54E8' }}>
          ↔
        </div>
      </div>

      <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">قبل</span>
      <span className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">بعد</span>
    </div>
  )
}
