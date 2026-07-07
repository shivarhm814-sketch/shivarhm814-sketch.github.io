import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Footer from '../src/components/Footer'
import ServiceCard from '../src/components/ServiceCard'

const mockService = {
  id: 'web-design',
  title: 'طراحی وب',
  description: 'توضیح تستی',
  icon: '🌐',
  features: ['ویژگی اول', 'ویژگی دوم'],
}

describe('Hero', () => {
  it('باید نام برند رو رندر کند', () => {
    render(<Hero />)
    expect(screen.getByText('کافه ایده')).toBeInTheDocument()
  })

  it('باید دکمه شروع همکاری داشته باشد', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /شروع همکاری/i })).toBeInTheDocument()
  })
})

describe('About', () => {
  it('باید آمار رو نشان بدهد', () => {
    render(<About />)
    expect(screen.getByText('سال تجربه')).toBeInTheDocument()
    expect(screen.getByText('پروژه‌ی موفق')).toBeInTheDocument()
  })
})

describe('ServiceCard', () => {
  it('باید title، description و features رو رندر کند', () => {
    render(<ServiceCard service={mockService} index={0} />)
    expect(screen.getByText('طراحی وب')).toBeInTheDocument()
    expect(screen.getByText('توضیح تستی')).toBeInTheDocument()
    expect(screen.getByText('ویژگی اول')).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('باید نام کافه ایده رو داشته باشد', () => {
    render(<Footer />)
    expect(screen.getAllByText(/کافه ایده/i).length).toBeGreaterThan(0)
  })
})
