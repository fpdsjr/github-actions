import { useEffect } from 'react'

export const useResetUrl = (isTokenLoaded: boolean) => {
  useEffect(() => {
    if (isTokenLoaded) {
      window.history.replaceState({}, '', '/')
    }
  }, [isTokenLoaded])
}
