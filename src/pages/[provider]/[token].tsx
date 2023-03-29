import { useEffect } from 'react'

import Home from '@/pages'

export default function Token() {
  useEffect(() => {
    window.history.replaceState({}, '', '/')
  })

  return <Home />
}
