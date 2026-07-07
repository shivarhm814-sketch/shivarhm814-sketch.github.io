# Handoff — کافه ایده (Café-e Ideh) · سیستم طراحی پورتفولیو

> پورتفولیوی تک‌صفحه‌ای، راست‌چین (RTL/فارسی) برای استودیوی خلاق **کافه ایده** (طراح: شیوا رحیمی).
> کانسپت برند: «ایده‌ی ساده‌ی مشتری — یک عکس، یک نیاز — را به اثری خاص تبدیل می‌کنیم؛ در وب و در عکس.»

---

## Overview
این بسته، **سیستم طراحی کامل** سایت کافه ایده است: پالت رنگی، تایپوگرافی، کامپوننت‌های UI، چیدمان هشت بخش سایت (Navbar → Footer)، و انیمیشن‌ها. هدف نهایی: ساخت یک وب‌سایت تک‌صفحه‌ای پورتفولیو با **React + Tailwind CSS**، راست‌چین.

## About the Design Files
فایل `Design System.dc.html` یک **مرجع طراحی (design reference) ساخته‌شده با HTML** است — نه کد production برای کپی مستقیم. این فایل یک «style guide» زنده است که ظاهر و رفتار موردنظر را نشان می‌دهد.

وظیفه: **بازسازی این طراحی در محیط کدبیس مقصد** (React + Tailwind، طبق درخواست صاحب پروژه) با الگوها و کتابخانه‌های همان پروژه. اگر پروژه هنوز محیطی ندارد، با **Vite + React + Tailwind** راه‌اندازی شود.

## Fidelity
**High-fidelity (hi-fi).** رنگ‌ها، فونت‌ها، اندازه‌ها و فاصله‌ها نهایی هستند؛ مقادیر دقیق هگز و px پایین آمده‌اند. UI را پیکسل‌پرفکت با همین مقادیر بسازید.

---

## Tech & Setup
- **React 18 + Vite + Tailwind CSS**.
- **RTL:** روی `<html dir="rtl" lang="fa">`. برای کلاس‌های منطقی Tailwind از پلاگین [`tailwindcss-rtl`](https://github.com/20lives/tailwindcss-rtl) یا v3.3+ logical properties (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`) استفاده کنید.
- **انیمیشن:** [Framer Motion](https://www.framer.com/motion/) برای fade-up هنگام اسکرول.
- **فونت‌ها (Google Fonts):**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lalezar&family=Reem+Kufi:wght@400;500;600;700&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  ```
  - **Reem Kufi** (400–700) → نام برند/لوگو و تیتر بزرگ هیرو (کوفی هندسی، حرفه‌ای و شاخص). وزن 700.
  - **Lalezar** (فقط وزن 400) → تیترهای بخش‌ها (H2، display، گرم).
  - **Vazirmatn** (300–900) → متن بدنه و UI (خوانا).

---

## Design Tokens

### Colors
**Brand (آبی‑بنفش — هویت، لینک‌ها، گرادیان):**
| token | hex |
|---|---|
| brand-50 | `#EEEEFC` |
| brand-100 | `#DCDBF9` |
| brand-300 | `#918CEC` |
| **brand-500** (پایه) | `#5B54E8` |
| brand-600 | `#4A43D1` |
| brand-700 | `#3A34A8` |

**Accent (گرم — فقط CTA و تأکید).** گزینه‌ی پیش‌فرض «مرجانی»؛ دو گزینه‌ی جایگزین هم تعریف شده:
| token | مرجانی (پیش‌فرض) | صورتی | طلایی |
|---|---|---|---|
| accent-soft | `#FFE7E0` | `#FCE3EC` | `#FBF0D6` |
| **accent-500** | `#FF7A59` | `#F0518A` | `#E0A526` |
| accent-700 (deep) | `#E85D3A` | `#D43A72` | `#C2860C` |

**Ink / Neutrals:**
| token | hex | کاربرد |
|---|---|---|
| ink-900 | `#15151E` | تیترها |
| ink-700 | `#34343F` | متن بدنه |
| ink-500 | `#6B6B7B` | متن ثانویه |
| ink-400 | `#9A9AAA` | caption / placeholder |
| ink-200 | `#E5E5EE` | بوردرها |
| bg-soft | `#F7F7FB` | پس‌زمینه‌ی صفحه |
| white | `#FFFFFF` | سطح کارت‌ها |

### Typography scale
| نقش | فونت | size | weight | line-height | نکته |
|---|---|---|---|---|---|
| H1 (cover) | Reem Kufi | 74px | 700 | 1.12 | letter-spacing 0 |
| H1 (محتوا) | Lalezar | 44px | 400 | 1.15 | |
| H2 (تیتر بخش) | Lalezar | 32–34px | 400 | 1.25 | letter-spacing .2px |
| H3 (تیتر کارت) | Vazirmatn | 22px | 700 | 1.3 | |
| Body | Vazirmatn | 16px | 400 | **1.8** | line-height بلند برای فارسی |
| Caption | Vazirmatn | 13px | 500 | 1.6 | رنگ ink-500 |
> Lalezar تک‌وزن است (تیتر بخش‌ها)؛ برای آن `font-weight:400`. نام برند و H1 هیرو روی **Reem Kufi 700**. letter-spacing منفی روی هیچ‌کدام نگذارید (حروف جمع می‌شوند).

### Radius & Shadow
- `--radius` (گوشه‌ها): پیش‌فرض **16px** (بازه‌ی قابل‌تنظیم 6–28).
- کارت‌ها: radius 20px، بوردر `1px solid ink-200`.
- shadow کارت: `0 14px 34px rgba(91,84,232,.10)` (ته‌رنگ برند).
- shadow دکمه CTA: `0 8px 20px rgba(255,122,89,.35)`.
- shadow کارت سرویس: `0 8px 18px rgba(91,84,232,.08)`.

### Spacing
فاصله‌ی عمودی بین بخش‌ها: **64px** (`pt-16`). پدینگ افقی کانتینر: 28px، عرض حداکثر محتوا: **1140px** وسط‌چین.

---

## Logo / Brand Mark
نشانه‌ی ترکیبی، نماد تلاقی «وب + عکس»:
- **مربع برند** ۳۵×۳۵px، `border-radius:12px`، گرادیان `linear-gradient(140deg, #5B54E8, #3A34A8)`، در گوشه‌ی بالا‑راست؛ داخلش یک قاب کوچک ۱۳px با بوردر `2px rgba(255,255,255,.55)` (نماد صفحه/وب).
- **دایره‌ی لنز اکسنت** ۲۸px در پایین‑چپ، با هم‌پوشانی روی مربع؛ `background:accent-500`، بوردر جداکننده `2.5px solid #F7F7FB`، و یک **نقطه‌ی سفید ۸px** در مرکز (= جرقه‌ی ایده / دیافراگم لنز). انیمیشن `sparkle` (پالس ملایم scale + glow).
- **وردمارک:** «کافه ایده» با فونت **Reem Kufi** (≈21px، وزن 700، رنگ ink-900) + زیرنویس «استودیوی شیوا رحیمی» (11px، 700، رنگ accent-500).

---

## Sections / Layout (از بالا به پایین، RTL)

نقطه‌ی شروع همه‌جا سمت **راست** است.

### ۱) Navbar
- Sticky (چسبان به بالا)، ارتفاع ۶۴–۷۲px، پس‌زمینه‌ی شیشه‌ای `rgba(247,247,251,.82)` + `backdrop-filter: blur(12px)`، بوردر زیرین `1px solid ink-200`.
- **راست:** لوگو (نشانه + وردمارک، لینک به `#top`). **چپ/وسط:** لینک‌های لنگری (`#colors`, `#type`...) با رنگ ink-500. در موبایل: منوی همبرگری.

### ۲) Hero (Cover)
- پنل بزرگ `border-radius:28px`، گرادیان **لیلاک/یاسی** `linear-gradient(135deg, #9E74E4, #6A46C4)`، متن سفید، پدینگ ۶۴×۵۶.
- **H1 هیرو با فونت Reem Kufi** (≈74px، وزن 700).
- دو دایره‌ی دکوراتیو شناور در پس‌زمینه (`floatA`/`floatB`).
- محتوا: badge کوچک → **H1 «کافه ایده»** (Lalezar ~84px) → خط مفهومی (24px، 700، با واژه‌ی «خاص» به رنگ accent) → پاراگراف توضیح → **خط تخصص با متن چرخان** → ردیف chipها.
- **پیشنهاد سایت واقعی:** دو ستونه — راست متن (H1 + توضیح + دو دکمه: CTA پر + ثانویه خطی)، چپ ایلاستریشن/عکس. موبایل: تک‌ستونه.

### ۳) About
- دو ستونه: **راست** عکس پرتره (`border-radius:12px`)، **چپ** متن معرفی + ردیف سه چیپ آمار (سال تجربه / پروژه / مشتری) با پس‌زمینه‌ی `brand-50`؛ عدد بزرگ + برچسب کوچک `ink-500`.

### ۴) Services
- سه کارت هم‌عرض (موبایل تک‌ستونه). هر کارت: آیکون خطی در مربع گرد `accent-soft` (آیکون به رنگ accent-500)، تیتر H3، توضیح کوتاه. shadow نرم؛ در `hover` کمی بالا بیاید (`translateY(-4px)`) و shadow پررنگ‌تر شود.

### ۵) Portfolio
- گرید **۳ستونه** دسکتاپ / ۲ تبلت / ۱ موبایل. نسبت تصاویر **۴:۳**، gap 8–12px.
- `hover`: زوم ملایم تصویر (`scale(1.05)`) + لایه‌ی برند نیمه‌شفاف (`#5B54E8` با opacity ~.82) که عنوان و تگ پروژه از پایین بالا می‌آید.
- بالای بخش: فیلتر دسته‌بندی با تگ‌ها.

### ۶) Testimonials
- **اسلایدر کارتی** (پیشنهاد). دسکتاپ ۲–۳ کارت هم‌زمان، موبایل یک کارت با swipe. هر کارت: ستاره‌ها به رنگ accent، نقل‌قول، آواتار + نام + سمت. ناوبری با نقطه (dots). جهت اسلاید **راست‌به‌چپ**.

### ۷) Contact Form
- دو ستونه روی پس‌زمینه‌ی `bg-soft` داخل یک کارت سفید بزرگ: **راست** فرم (نام، ایمیل، پیام + دکمه CTA با accent)، **چپ** اطلاعات تماس و شبکه‌های اجتماعی.
- فیلدها: بوردر `1.5px solid ink-200`، radius 12px، پدینگ 12×14. حالت **focus**: `border-color: brand-500` + `box-shadow: 0 0 0 3px rgba(91,84,232,.16)`.

### ۸) Footer
- پس‌زمینه‌ی تیره `brand-700` (#3A34A8)، متن روشن. لوگو + چند ستون لینک، نوار پایین با کپی‌رایت + آیکون شبکه‌های اجتماعی (در hover به رنگ accent).

---

## UI Components (مشخصات دقیق)

**Button — Primary (CTA):** `background: accent-500`، متن سفید 700/15px، پدینگ 13×26، `border-radius: var(--radius)`، shadow `0 8px 20px rgba(255,122,89,.35)`. hover: `brightness(1.05)` + `translateY(-1px)`.

**Button — Secondary:** پس‌زمینه سفید، متن `brand-500` 700/15px، بوردر `1.6px solid brand-500`. hover: `background: #EEEEFC`.

**Button — Ghost:** بدون بوردر، متن `ink-500` 600/15px. hover: متن `ink-900`.

**Button — Disabled:** `background: ink-200`، متن `ink-400`، `cursor: not-allowed`.

**Card:** سفید، `border-radius:16px`، بوردر `1px solid #F0F0F5`، shadow `0 14px 34px rgba(91,84,232,.10)`. ساختار: تصویر بالا (۴:۳) → بدنه با تگ + H3 + توضیح.

**Inputs:** طبق بخش Contact بالا.

**Badge / Tag (تگ پروژه):** pill (`border-radius:999px`)، پدینگ 7×14، 600/13px. حالت معمول: `bg brand-50` + متن `brand-700`. حالت منتخب: `bg accent-soft` + متن accent-700.

**Avatar:** دایره ۴۰px، گرادیان `linear-gradient(135deg, brand-500, accent-500)`، حرف سفید 800.

---

## Interactions & Animation

**Reveal on scroll (الگوی اصلی — Framer Motion):**
```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
};
<motion.section variants={fadeUp} initial="hidden" whileInView="show"
  viewport={{ once: true, margin: "-8% 0px" }}>…</motion.section>
```
- کارت‌های Services/Portfolio: `staggerChildren: 0.08`.
- Micro: دکمه‌ها `whileHover={{ y: -2 }}`؛ کارت‌ها بالا‑آمدن + shadow.
- به `prefers-reduced-motion: reduce` احترام بگذارید (همه‌ی انیمیشن‌ها خاموش).

**انیمیشن‌های دکوراتیو (CSS keyframes):**
- `floatA` / `floatB`: حرکت آرام دایره‌های پس‌زمینه‌ی Hero (13s/16s ease-in-out infinite).
- `rotateWords`: متن چرخان تخصص‌ها (`طراحی وب`، `عکاسی خلاق`، `هویت بصری`، `تجربه کاربری`) — لیست عمودی با کلیپ، translateY پله‌ای، ۹s.
- `sparkle`: پالس ملایم لنز لوگو (scale 1→1.18 + glow)، ۲.۶–۳s.

---

## tailwind.config.js
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],     // body
        display: ['Lalezar', 'Vazirmatn', 'sans-serif'], // section headings (H2)
        brand: ['Reem Kufi', 'Vazirmatn', 'sans-serif'], // logo + hero H1
      },
      colors: {
        brand: { 50:'#EEEEFC',100:'#DCDBF9',300:'#918CEC',500:'#5B54E8',600:'#4A43D1',700:'#3A34A8', DEFAULT:'#5B54E8' },
        accent:{ soft:'#FFE7E0',300:'#FFA98F',500:'#FF7A59',700:'#E85D3A', DEFAULT:'#FF7A59' },
        ink:   { 900:'#15151E',700:'#34343F',500:'#6B6B7B',400:'#9A9AAA',200:'#E5E5EE' },
        soft:  '#F7F7FB',
      },
      borderRadius: { xl: '16px' },
      boxShadow: { card: '0 14px 34px rgba(91,84,232,.10)' },
    },
  },
};
```

---

## Files
- `Design System.dc.html` — مرجع طراحی زنده (style guide). همه‌ی مقادیر بالا از این فایل استخراج شده‌اند. برای دیدن نتیجه‌ی نهایی فقط در مرورگر بازش کنید.
- `screens/` — اسکرین‌شات مرجع از هر بخش (برای دید سریع بدون باز کردن فایل):
  - `01-cover-header.png` — Navbar + لوگو + کاور (Hero) با تیتر، متن چرخان و بلاب‌های شناور.
  - `02-colors.png` — پالت رنگی (brand / accent / ink).
  - `03-typography.png` — اسکیل تایپوگرافی (Lalezar + Vazirmatn).
  - `04-components.png` — دکمه‌ها، تگ‌ها، آواتار، کارت و فرم.
  - `05-sections-a/b/c.png` — وایرفریم و توضیح هشت بخش سایت (Navbar → Footer).
  - `06-motion.png` — الگوی انیمیشن fade-up + کد Framer Motion.
  - `07-tailwind-config.png` — اسنیپت `tailwind.config.js`.

## Assets
هیچ asset باینری‌ای وجود ندارد. همه‌ی تصاویر در مرجع، **placeholder راه‌راه** با برچسب مونواسپیس هستند (مثل `project shot`، `photo`، `illustration`)؛ در سایت واقعی با عکس‌های واقعی شیوا رحیمی جایگزین شوند. آیکون‌ها: یک کتابخانه‌ی خطی سبک (مثل [Lucide](https://lucide.dev/)) پیشنهاد می‌شود.
