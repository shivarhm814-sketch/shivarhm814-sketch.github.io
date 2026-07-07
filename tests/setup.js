import '@testing-library/jest-dom'

// Framer Motion از IntersectionObserver برای whileInView استفاده می‌کند
// که در jsdom وجود ندارد
global.IntersectionObserver = class {
  constructor(cb) { this.cb = cb }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// ResizeObserver هم ممکن است لازم باشد
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
