import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

const WORDS = ['طراحی وب', 'عکاسی خلاق', 'هویت بصری', 'تجربه کاربری', 'طراحی وب']

export default function Hero() {
  return (
    <section id="home" className="pt-20 pb-0 px-7 bg-soft">
      <div className="mx-auto" style={{ maxWidth: 1140 }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-3xl overflow-hidden relative text-white"
          style={{
            background: 'linear-gradient(135deg, #9E74E4 0%, #6A46C4 100%)',
            padding: 'clamp(32px, 8vw, 64px) clamp(20px, 6vw, 56px)',
          }}
        >
          {/* دایره‌های دکوراتیو */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: -60, top: -60, width: 320, height: 320,
              background: '#FF7A59', opacity: .22, filter: 'blur(8px)',
              animation: 'floatA 13s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: 120, bottom: -120, width: 260, height: 260,
              background: '#fff', opacity: .08,
              animation: 'floatB 16s ease-in-out infinite',
            }}
          />

          {/* محتوا */}
          <div className="relative grid md:grid-cols-[47fr_53fr] gap-12 items-center">
            {/* ستون راست — متن */}
            <div>
              <span
                className="inline-flex items-center gap-2 font-semibold mb-4"
                style={{
                  background: 'rgba(255,255,255,.14)',
                  border: '1px solid rgba(255,255,255,.25)',
                  padding: '7px 14px', borderRadius: 999,
                  fontSize: 12.5, letterSpacing: '.2px',
                }}
              >
                استودیوی خلاق · کافه ایده
              </span>

              <h1
                className="font-brand text-white"
                style={{ fontSize: 'clamp(39px, 5.3vw, 65px)', fontWeight: 700, lineHeight: 1.12, letterSpacing: 0, margin: '16px 0 0' }}
              >
                کافه ایده
              </h1>

              <p className="font-bold mt-4" style={{ fontSize: 22, lineHeight: 1.6, maxWidth: 540 }}>
                از یک ایده ساده تا یک وب‌سایت یا تصویر{' '}
                <span style={{ color: '#FF7A59' }}>متمایز</span>
              </p>

              {/* متن چرخان */}
              <div className="flex items-baseline gap-3 mt-6" style={{ fontSize: 20, fontWeight: 800 }}>
                <span style={{ color: 'rgba(255,255,255,.66)', fontWeight: 500, fontSize: 17 }}>تخصص در</span>
                <span style={{ position: 'relative', display: 'inline-block', height: '1.5em', overflow: 'hidden' }}>
                  <span
                    className="flex flex-col"
                    style={{ animation: 'rotateWords 24s cubic-bezier(.7,0,.3,1) infinite' }}
                  >
                    {WORDS.map((w, i) => (
                      <span key={i} style={{ height: '1.5em', lineHeight: '1.5em', whiteSpace: 'nowrap', color: '#FF7A59' }}>{w}</span>
                    ))}
                  </span>
                </span>
              </div>

              {/* دکمه‌ها */}
              <div className="flex flex-wrap mt-8" style={{ gap: 16 }}>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -2 }}
                  className="text-white font-bold"
                  style={{
                    background: '#FF7A59', padding: '13px 26px', borderRadius: 16,
                    boxShadow: '0 8px 20px rgba(255,122,89,.35)',
                    fontSize: 15, textDecoration: 'none',
                  }}
                >
                  شروع همکاری
                </motion.a>
                <motion.a
                  href="#portfolio"
                  whileHover={{ y: -2 }}
                  className="font-bold"
                  style={{
                    background: '#fff', color: '#5B54E8', padding: '12px 24px', borderRadius: 16,
                    border: '1.6px solid #5B54E8',
                    fontSize: 15, textDecoration: 'none',
                    transition: 'background-color .2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#EEEEFC' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff' }}
                >
                  نمونه‌کارها
                </motion.a>
              </div>
            </div>

            {/* ستون چپ — عکس/ایلاستریشن (یا placeholder اگر فایل /public/images/hero.jpg وجود نداشته باشد) */}
            <div className="hidden md:flex items-center justify-center relative w-full" style={{ aspectRatio: '4/3' }}>
              <div
                className="absolute inset-0 flex items-center justify-center text-white/40 font-bold rounded-2xl"
                style={{
                  background: 'repeating-linear-gradient(45deg,rgba(255,255,255,.08),rgba(255,255,255,.08) 10px,rgba(255,255,255,.04) 10px,rgba(255,255,255,.04) 20px)',
                  border: '1.5px dashed rgba(255,255,255,.25)',
                  fontSize: 14,
                }}
              >
                تصویر / ایلاستریشن
              </div>
              <img
                src="/images/hero.jpg"
                alt="کافه ایده"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-0 transition-opacity duration-300"
                onLoad={(e) => { e.currentTarget.style.opacity = '1' }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
