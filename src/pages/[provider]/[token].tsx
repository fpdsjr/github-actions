/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { UserContext } from '@/contexts/UserContext'
import { useResetUrl } from '@/hooks/useResetUrl'
import { api } from '@/lib'
import Home from '@/pages/home'

export default function Token() {
  const router = useRouter()

  useResetUrl(!!router?.query.ct)

  const { handleUserToken } = useContext(UserContext)

  const fetchValidateUser = async () => {
    const { data } = await api.post(`/tokens/generate_ticket`, null, {
      params: {
        ct_token: router?.query.ct,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return data
  }

  const mutation = useMutation(fetchValidateUser, {
    onSuccess: (data) => {
      Cookies.set('tvnsports_session', data.ticket)
      handleUserToken(data.ticket)
    },
    onError: () => {
      Cookies.remove('tvnsports_session')
    },
  })

  useEffect(() => {
    if (router?.query.ct) {
      mutation.mutate()
    }
  }, [router?.query.ct])

  return <Home />
}
