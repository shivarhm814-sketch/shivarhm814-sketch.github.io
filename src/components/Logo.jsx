export default function Logo({ light = false }) {
  return (
    <a href="#home" className="flex items-center gap-2 sm:gap-3 text-decoration-none no-underline min-w-0">
      <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex-none">
        <svg viewBox="0 0 64 72" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="logoCupGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#8C84F4"/>
              <stop offset="50%"  stopColor="#5B54E8"/>
              <stop offset="100%" stopColor="#2C26A0"/>
            </linearGradient>
            <radialGradient id="logoCoffeeGrad" cx="50%" cy="35%" r="70%">
              <stop offset="0%"   stopColor="#FFAB84"/>
              <stop offset="100%" stopColor="#FF6030"/>
            </radialGradient>
            <linearGradient id="logoSaucerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#5B54E8"/>
              <stop offset="100%" stopColor="#2C26A0"/>
            </linearGradient>
            <linearGradient id="logoSteamGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#FF7844"/>
              <stop offset="35%"  stopColor="#FFBDA0"/>
              <stop offset="68%"  stopColor="#E8E6FF"/>
              <stop offset="100%" stopColor="#8C84F4"/>
            </linearGradient>
          </defs>

          {/* بخار */}
          <path pathLength="1" d="M 32,25 C 24,18 40,12 32,4" fill="none" stroke="#8C84F4" strokeWidth="7" strokeLinecap="round" opacity=".32"/>
          <path className="logo-steam" pathLength="1" d="M 32,25 C 24,18 40,12 32,4" fill="none" stroke="url(#logoSteamGrad)" strokeWidth="3.5" strokeLinecap="round"/>

          {/* دسته */}
          <path d="M 50,32 C 60,32 60,46 49,46" fill="none" stroke="#2C26A0" strokeWidth="5" strokeLinecap="round"/>

          {/* بدنه فنجان */}
          <path d="M 12,28 L 52,28 C 53,28.3 54,29.5 53.6,31 L 49,50 Q 32,55 15,50 L 10.4,31 C 10,29.5 11,28.3 12,28 Z" fill="url(#logoCupGrad)"/>

          {/* لبه بالایی */}
          <ellipse cx="32" cy="28" rx="20" ry="2.6" fill="#5650CC"/>
          <ellipse cx="32" cy="27.4" rx="19" ry="2.1" fill="#7870E8"/>

          {/* مایع قهوه */}
          <ellipse cx="32" cy="27.4" rx="16" ry="1.8" fill="url(#logoCoffeeGrad)"/>
          <ellipse cx="27" cy="26.8" rx="6" ry=".7" fill="rgba(255,255,255,.28)"/>

          {/* نشانه برند */}
          <circle cx="32" cy="40" r="3" fill="#FF7A59" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'sparkle 3s ease-in-out infinite' }}/>
          <circle cx="32" cy="40" r="1.6" fill="rgba(255,255,255,.65)"/>

          {/* نعلبکی */}
          <ellipse cx="32" cy="63" rx="23" ry="5" fill="url(#logoSaucerGrad)"/>
          <ellipse cx="25" cy="61.5" rx="9" ry="1.7" fill="rgba(255,255,255,.22)"/>
        </svg>
      </div>
      <div style={{ lineHeight: 1.2 }} className="min-w-0">
        <div
          className="font-brand whitespace-nowrap"
          style={{ fontSize: 'clamp(16px, 4.5vw, 21px)', fontWeight: 700, letterSpacing: 0, color: light ? '#fff' : '#15151E' }}
        >
          کافه ایده
        </div>
        <div
          className="text-accent-500 font-bold whitespace-nowrap"
          style={{ fontSize: 'clamp(9px, 2.6vw, 11px)', letterSpacing: '.2px' }}
        >
          استودیوی شیوا رحیمی
        </div>
      </div>
    </a>
  )
}
