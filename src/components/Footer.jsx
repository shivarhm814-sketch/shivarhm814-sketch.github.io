import Logo from './Logo'

const LINKS = [
  { label: 'خانه',      href: '#home' },
  { label: 'درباره‌ام', href: '#about' },
  { label: 'خدمات',     href: '#services' },
  { label: 'نمونه کارها', href: '#portfolio' },
  { label: 'تماس',      href: '#contact' },
]

const SOCIALS = [
  { label: 'اینستاگرام', icon: '📸' },
  { label: 'تلگرام',     icon: '✈️' },
  { label: 'لینکدین',   icon: '💼' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #9E74E4 0%, #6A46C4 100%)', color: 'rgba(255,255,255,.75)' }}>
      <div className="mx-auto px-7 py-12" style={{ maxWidth: 1140 }}>
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* لوگو */}
          <div>
            <div className="mb-4">
              <Logo light />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,.6)', maxWidth: 260 }}>
              استودیوی خلاق شیوا رحیمی — تبدیل ایده به تجربه‌ی بصری ماندگار.
            </p>
          </div>

          {/* لینک‌ها */}
          <div>
            <p className="text-white font-bold mb-4" style={{ fontSize: 14 }}>صفحات</p>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-accent-500 transition-colors duration-150"
                    style={{ textDecoration: 'none', color: 'rgba(255,255,255,.6)', fontSize: 14 }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* شبکه اجتماعی */}
          <div>
            <p className="text-white font-bold mb-4" style={{ fontSize: 14 }}>شبکه‌های اجتماعی</p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="transition-all duration-200 hover:scale-110 hover:text-accent-500"
                  style={{
                    width: 40, height: 40, borderRadius: 10, fontSize: 18,
                    background: 'rgba(255,255,255,.12)', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,122,89,.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.12)' }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,.15)', fontSize: 13 }}
        >
          <span>تمام حقوق محفوظ است © {new Date().getFullYear()} · کافه ایده</span>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>ساخته‌شده با React · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
