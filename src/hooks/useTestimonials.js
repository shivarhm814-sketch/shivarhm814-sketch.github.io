import { useState, useEffect } from 'react'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    import('../data/testimonials.json')
      .then((mod) => setTestimonials(mod.default))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { testimonials, loading, error }
}
