import { useState, useEffect } from 'react'
import Logo from './Logo'

const LINKS = [
  { href: '#about',        label: 'درباره‌ام' },
  { href: '#services',     label: 'خدمات' },
  { href: '#portfolio',    label: 'نمونه کارها' },
  { href: '#testimonials', label: 'نظرات' },
  { href: '#contact',      label: 'تماس' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(247,247,251,.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #E5E5EE' : '1px solid transparent',
      }}
    >
      <nav
        className="mx-auto px-7 flex items-center justify-between gap-4"
        style={{ maxWidth: 1140, height: 68 }}
        aria-label="ناوبری اصلی"
      >
        <Logo />

        {/* لینک‌های دسکتاپ */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-ink-500 hover:text-ink-900 transition-colors duration-150"
                style={{ fontSize: 15, fontWeight: 500, textDecoration: 'none' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-block text-white font-bold transition-all duration-200 hover:-translate-y-px"
          style={{
            background: '#FF7A59',
            fontSize: 14,
            padding: '10px 22px',
            borderRadius: 14,
            boxShadow: '0 8px 20px rgba(255,122,89,.35)',
            textDecoration: 'none',
          }}
        >
          شروع همکاری
        </a>

        {/* همبرگر موبایل */}
        <button
          aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-ink-700 text-2xl leading-none"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-ink-200 px-7 py-5">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-ink-700 hover:text-brand-500 font-medium transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
