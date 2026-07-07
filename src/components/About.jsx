import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

const STATS = [
  { value: '+۵۰', label: 'پروژه‌ی موفق' },
  { value: '+۳۰', label: 'مشتری راضی' },
  { value: '+۵',  label: 'سال تجربه' },
]

export default function About() {
  const [ratio, setRatio] = useState(null)

  return (
    <section id="about" className="py-16 px-7 bg-white">
      <div className="mx-auto grid md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1140 }}>

        {/* راست — عکس */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
        >
          <div className="relative w-full mx-auto" style={{ aspectRatio: ratio || '3/4', maxWidth: 340 }}>
            <div
              className="absolute inset-0 flex items-center justify-center text-ink-400 font-bold"
              style={{
                background: 'repeating-linear-gradient(45deg,#DDDCEC,#DDDCEC 9px,#EEEEFC 9px,#EEEEFC 18px)',
                border: '1px solid #E5E5EE',
                borderRadius: 12,
                fontSize: 14,
              }}
            >
              عکس پرتره
            </div>
            {/* placeholder جایگزین می‌شود وقتی فایل public/images/portrait.jpg وجود داشته باشد؛ قاب به‌صورت خودکار با ابعاد واقعی عکس تنظیم می‌شود */}
            <img
              src="/images/portrait.jpg"
              alt="شیوا رحیمی"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
              style={{ borderRadius: 12 }}
              onLoad={(e) => {
                setRatio(`${e.currentTarget.naturalWidth}/${e.currentTarget.naturalHeight}`)
                e.currentTarget.style.opacity = '1'
              }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        </motion.div>

        {/* چپ — متن */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ delay: 0.12 }}
        >
          <p className="text-accent-500 font-bold mb-2" style={{ fontSize: 13 }}>درباره‌ی من</p>
          <h2 className="font-display text-ink-900 mb-5" style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.25 }}>
            خلاقیت و فناوری در کنار هم
          </h2>
          <p className="text-ink-500 mb-4" style={{ fontSize: 16, lineHeight: 1.9 }}>
            بیش از ۵ سال است که در حوزه‌ی طراحی دیجیتال فعالیت می‌کنم. تخصص من ترکیب زیبایی بصری
            با کاربردپذیری واقعی است — طراحی‌هایی که نه‌تنها چشم‌نواز هستند، بلکه نتیجه‌ی ملموس
            برای کسب‌وکار شما به همراه می‌آورند.
          </p>
          <p className="text-ink-500 mb-8" style={{ fontSize: 16, lineHeight: 1.9 }}>
            از طراحی وب‌سایت‌های فروشگاهی تا اپ‌های موبایل و تصویرسازی هوشمند با هوش مصنوعی،
            هر پروژه را با دقت و اشتیاق به انجام می‌رسانم.
          </p>

          {/* آمار */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl text-center py-4 px-2" style={{ background: '#EEEEFC' }}>
                <p className="text-brand-500 font-black" style={{ fontSize: 26, margin: 0 }}>{s.value}</p>
                <p className="text-ink-500" style={{ fontSize: 12, margin: '4px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
