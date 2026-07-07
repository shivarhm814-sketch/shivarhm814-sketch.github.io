import { useState, useEffect } from 'react'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    import('../data/services.json')
      .then((mod) => setServices(mod.default))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { services, loading, error }
}
