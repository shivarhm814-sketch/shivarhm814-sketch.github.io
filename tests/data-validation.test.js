import { describe, it, expect } from 'vitest'
import services from '../src/data/services.json'
import portfolio from '../src/data/portfolio.json'
import testimonials from '../src/data/testimonials.json'

describe('services.json', () => {
  it('باید آرایه‌ای با حداقل یک آیتم باشد', () => {
    expect(Array.isArray(services)).toBe(true)
    expect(services.length).toBeGreaterThan(0)
  })

  it('هر سرویس باید id، title، description، icon و features داشته باشد', () => {
    services.forEach((s) => {
      expect(s).toHaveProperty('id')
      expect(s).toHaveProperty('title')
      expect(s).toHaveProperty('description')
      expect(s).toHaveProperty('icon')
      expect(Array.isArray(s.features)).toBe(true)
    })
  })
})

describe('portfolio.json', () => {
  it('باید آرایه‌ای با حداقل یک آیتم باشد', () => {
    expect(Array.isArray(portfolio)).toBe(true)
    expect(portfolio.length).toBeGreaterThan(0)
  })

  it('هر آیتم باید id، title، category و tags داشته باشد', () => {
    portfolio.forEach((p) => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('category')
      expect(Array.isArray(p.tags)).toBe(true)
    })
  })

  it('category باید یکی از مقادیر مجاز باشد (یا آرایه‌ای از آن‌ها)', () => {
    const valid = ['web-design', 'app-design', 'ai-photo']
    portfolio.forEach((p) => {
      const categories = Array.isArray(p.category) ? p.category : [p.category]
      categories.forEach((c) => expect(valid).toContain(c))
    })
  })
})

describe('testimonials.json', () => {
  it('باید آرایه‌ای با حداقل یک آیتم باشد', () => {
    expect(Array.isArray(testimonials)).toBe(true)
    expect(testimonials.length).toBeGreaterThan(0)
  })

  it('هر نظر باید id، name، role و text داشته باشد', () => {
    testimonials.forEach((t) => {
      expect(t).toHaveProperty('id')
      expect(t).toHaveProperty('name')
      expect(t).toHaveProperty('role')
      expect(t).toHaveProperty('text')
      expect(t.text.length).toBeGreaterThan(0)
    })
  })
})
