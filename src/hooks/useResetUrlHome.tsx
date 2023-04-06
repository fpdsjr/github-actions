import { useEffect } from 'react'

export const useResetUrlHome = (asPath: string) => {
  useEffect(() => {
    if (asPath === '/home') {
      window.history.replaceState({}, '', '/')
    }
  }, [asPath])
}
