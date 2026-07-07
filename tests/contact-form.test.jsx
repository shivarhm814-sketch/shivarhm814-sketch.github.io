import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactForm from '../src/components/ContactForm'

describe('ContactForm', () => {
  it('باید فرم رو رندر کند', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/نام و نام‌خانوادگی/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ایمیل/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/نوع سرویس/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/توضیح پروژه/i)).toBeInTheDocument()
  })

  it('باید خطای validation نشان بدهد وقتی فرم خالی ارسال شود', async () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: /ارسال پیام/i }))
    expect(await screen.findByText(/نام الزامی است/i)).toBeInTheDocument()
    expect(await screen.findByText(/ایمیل الزامی است/i)).toBeInTheDocument()
  })

  it('باید خطای ایمیل نامعتبر نشان بدهد', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/نام و نام‌خانوادگی/i), { target: { value: 'علی' } })
    fireEvent.change(screen.getByLabelText(/ایمیل/i), { target: { value: 'not-an-email' } })
    fireEvent.click(screen.getByRole('button', { name: /ارسال پیام/i }))
    expect(await screen.findByText(/ایمیل معتبر نیست/i)).toBeInTheDocument()
  })
})
