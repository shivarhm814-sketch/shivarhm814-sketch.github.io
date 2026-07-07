import { useState } from 'react'

const BALE_CONTACT_URL = 'https://ble.ir/shiva65r'

const initialState = {
  name: '',
  email: '',
  service: '',
  message: '',
  _honey: '',
}

export function useContactForm() {
  const [fields, setFields] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function validate(data) {
    const errs = {}
    if (!data.name.trim()) errs.name = 'نام الزامی است'
    if (!data.email.trim()) {
      errs.email = 'ایمیل الزامی است'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'ایمیل معتبر نیست'
    }
    if (!data.service) errs.service = 'لطفاً یک سرویس انتخاب کنید'
    if (!data.message.trim()) errs.message = 'پیام الزامی است'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (fields._honey) return // honeypot — spam bot

    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('submitting')
    try {
      window.open(BALE_CONTACT_URL, '_blank', 'noopener,noreferrer')
      setStatus('success')
      setFields(initialState)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  return { fields, errors, status, handleChange, handleSubmit }
}
