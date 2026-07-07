import { motion } from 'framer-motion'
import { useContactForm } from '../hooks/useContactForm'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

const SERVICES = [
  { value: '',           label: 'انتخاب کنید...' },
  { value: 'web-design', label: 'طراحی وب' },
  { value: 'app-design', label: 'طراحی اپلیکیشن' },
  { value: 'ai-photo',   label: 'تصویرسازی با هوش مصنوعی' },
]

const inputStyle = (hasError) => ({
  width: '100%', fontFamily: 'inherit', fontSize: 14.5, color: '#34343F',
  padding: '12px 14px', borderRadius: 12,
  border: `1.5px solid ${hasError ? '#E85D3A' : '#E5E5EE'}`,
  background: '#fff', outline: 'none',
  boxSizing: 'border-box',
})

const focusStyle = { borderColor: '#5B54E8', boxShadow: '0 0 0 3px rgba(91,84,232,.16)' }

export default function ContactForm() {
  const { fields, errors, status, handleChange, handleSubmit } = useContactForm()

  return (
    <section id="contact" className="py-16 px-7" style={{ background: '#F7F7FB' }}>
      <div className="mx-auto" style={{ maxWidth: 1140 }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
          className="text-center mb-12"
        >
          <p className="text-accent-500 font-bold mb-2" style={{ fontSize: 13 }}>تماس</p>
          <h2 className="font-display text-ink-900 mb-3" style={{ fontSize: 34, fontWeight: 400 }}>
            با من در ارتباط باشید
          </h2>
          <p className="text-ink-500" style={{ fontSize: 15.5 }}>پروژه‌تان را برایم بنویسید تا باهم بررسی کنیم.</p>
        </motion.div>

        {/* کارت اصلی */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
          className="bg-white rounded-2xl shadow-card grid md:grid-cols-2 gap-0 overflow-hidden"
          style={{ border: '1px solid #F0F0F5' }}
        >
          {/* ستون راست — فرم */}
          <div className="p-8 md:p-10">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div style={{ fontSize: 56 }}>🎉</div>
                <h3 className="text-ink-900 font-bold mt-4 mb-2" style={{ fontSize: 22 }}>پیام شما ارسال شد!</h3>
                <p className="text-ink-500">در اسرع وقت با شما تماس می‌گیرم.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* honeypot */}
                <input type="text" name="_honey" value={fields._honey} onChange={handleChange} aria-hidden="true" tabIndex={-1} className="hidden" />

                {/* نام */}
                <div>
                  <label htmlFor="cf-name" className="block font-semibold mb-1.5 text-ink-700" style={{ fontSize: 13 }}>نام و نام‌خانوادگی</label>
                  <input
                    id="cf-name" name="name" type="text"
                    value={fields.name} onChange={handleChange}
                    placeholder="مثلاً: مریم احمدی"
                    style={inputStyle(errors.name)}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = errors.name ? '#E85D3A' : '#E5E5EE' }}
                  />
                  {errors.name && <p className="text-accent-700 mt-1" style={{ fontSize: 12.5 }}>{errors.name}</p>}
                </div>

                {/* ایمیل */}
                <div>
                  <label htmlFor="cf-email" className="block font-semibold mb-1.5 text-ink-700" style={{ fontSize: 13 }}>ایمیل</label>
                  <input
                    id="cf-email" name="email" type="email" dir="ltr"
                    value={fields.email} onChange={handleChange}
                    placeholder="example@email.com"
                    style={{ ...inputStyle(errors.email), textAlign: 'left' }}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = errors.email ? '#E85D3A' : '#E5E5EE' }}
                  />
                  {errors.email && <p className="text-accent-700 mt-1" style={{ fontSize: 12.5 }}>{errors.email}</p>}
                </div>

                {/* سرویس */}
                <div>
                  <label htmlFor="cf-service" className="block font-semibold mb-1.5 text-ink-700" style={{ fontSize: 13 }}>نوع سرویس</label>
                  <select
                    id="cf-service" name="service"
                    value={fields.service} onChange={handleChange}
                    style={{ ...inputStyle(errors.service), appearance: 'none' }}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = errors.service ? '#E85D3A' : '#E5E5EE' }}
                  >
                    {SERVICES.map((o) => <option key={o.value} value={o.value} disabled={!o.value}>{o.label}</option>)}
                  </select>
                  {errors.service && <p className="text-accent-700 mt-1" style={{ fontSize: 12.5 }}>{errors.service}</p>}
                </div>

                {/* پیام */}
                <div>
                  <label htmlFor="cf-message" className="block font-semibold mb-1.5 text-ink-700" style={{ fontSize: 13 }}>توضیح پروژه</label>
                  <textarea
                    id="cf-message" name="message" rows={5}
                    value={fields.message} onChange={handleChange}
                    placeholder="درباره‌ی پروژه‌تان بنویسید…"
                    style={{ ...inputStyle(errors.message), resize: 'none' }}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = errors.message ? '#E85D3A' : '#E5E5EE' }}
                  />
                  {errors.message && <p className="text-accent-700 mt-1" style={{ fontSize: 12.5 }}>{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-accent-700 text-center" style={{ fontSize: 13 }}>مشکلی پیش آمد. لطفاً دوباره تلاش کنید.</p>
                )}

                <motion.button
                  type="submit" whileHover={{ y: -2 }}
                  disabled={status === 'submitting'}
                  className="text-white font-bold w-full"
                  style={{
                    background: '#FF7A59', padding: '13px 26px', borderRadius: 14,
                    boxShadow: '0 8px 20px rgba(255,122,89,.35)',
                    fontSize: 15, border: 'none', cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: status === 'submitting' ? .6 : 1,
                  }}
                >
                  {status === 'submitting' ? 'در حال ارسال...' : 'ارسال پیام'}
                </motion.button>
              </form>
            )}
          </div>

          {/* ستون چپ — اطلاعات تماس */}
          <div
            className="p-8 md:p-10 flex flex-col justify-center gap-6"
            style={{ background: '#EEEEFC' }}
          >
            <div>
              <h3 className="font-display text-ink-900 mb-2" style={{ fontSize: 24, fontWeight: 400 }}>راه‌های ارتباطی</h3>
              <p className="text-ink-500" style={{ fontSize: 14.5, lineHeight: 1.85 }}>
                همیشه برای شنیدن ایده‌های جدید و همکاری‌های خلاقانه آماده‌ام.
              </p>
            </div>

            {[
              {
                icon: '📧',
                label: 'ایمیل',
                value: 'shiva.rhm.814@gmail.com',
                href: 'mailto:shiva.rhm.814@gmail.com',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#29A9EB">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-2 1.92c-.24.24-.44.44-.86.44z" />
                  </svg>
                ),
                label: 'تلگرام',
                value: '@Shivar65',
                href: 'https://t.me/Shivar65',
              },
            ].map((item) => {
              const content = (
                <>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#fff', fontSize: 18 }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-ink-400 font-semibold" style={{ fontSize: 12, margin: 0 }}>{item.label}</p>
                    <p className="text-ink-700 font-semibold" style={{ fontSize: 14, margin: 0 }}>{item.value}</p>
                  </div>
                </>
              )
              return item.href ? (
                <a
                  key={item.label} href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 no-underline"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3">
                  {content}
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
