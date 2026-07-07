import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PortfolioCard from '../src/components/PortfolioCard'
import BeforeAfterSlider from '../src/components/BeforeAfterSlider'

const webItem = {
  id: 'p1',
  title: 'پروژه وب',
  category: 'web-design',
  description: 'توضیح',
  image: null,
  tags: ['UI', 'وب'],
}

const aiItem = {
  id: 'p2',
  title: 'پروژه هوش مصنوعی',
  category: 'ai-photo',
  description: 'توضیح',
  imageBefore: null,
  imageAfter: null,
  tags: ['AI'],
}

describe('PortfolioCard', () => {
  it('باید عنوان و تگ‌ها را نشان بدهد', () => {
    render(<PortfolioCard item={webItem} index={0} />)
    expect(screen.getAllByText('پروژه وب').length).toBeGreaterThan(0)
    expect(screen.getAllByText('UI').length).toBeGreaterThan(0)
  })

  it('برای دسته‌بندی ai-photo باید slider نشان بدهد', () => {
    render(<PortfolioCard item={aiItem} index={0} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })
})

describe('BeforeAfterSlider', () => {
  it('باید دو تصویر رندر کند', () => {
    render(<BeforeAfterSlider before={null} after={null} altBefore="قبل" altAfter="بعد" />)
    expect(screen.getByAltText('قبل')).toBeInTheDocument()
    expect(screen.getByAltText('بعد')).toBeInTheDocument()
  })

  it('باید role=slider داشته باشد', () => {
    render(<BeforeAfterSlider before={null} after={null} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })
})
