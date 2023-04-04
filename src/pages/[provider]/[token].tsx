import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Home from '@/pages/home'

export default function Token() {
  const router = useRouter()
  console.log(router.query.ct)

  useEffect(() => {
    // window.history.replaceState({}, '', '/')
  })

  return <Home />
}
