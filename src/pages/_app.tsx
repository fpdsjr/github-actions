import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import TagManager from 'react-gtm-module'

import { UserProvider } from '@/contexts/UserContext'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-MP2F4PC' })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </UserProvider>
    </QueryClientProvider>
  )
}
