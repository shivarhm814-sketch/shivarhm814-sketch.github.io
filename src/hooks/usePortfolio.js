import { useState, useEffect } from 'react'

export function usePortfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    import('../data/portfolio.json')
      .then((mod) => setItems(mod.default))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { items, loading, error }
}
