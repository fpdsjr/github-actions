import { ReactNode, createContext, useEffect, useState } from 'react'

import { api } from '@/lib'
import Cookies from 'js-cookie'

interface UserContextData {
  userToken: string
  handleUserToken: (token: string) => void
  user: {
    id: number
    name: string
    email: string
    cpf: string | null
    gender: 'male' | 'female'
    birth_date: string
    favorite_sports: null
    channels: string[]
  }
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserProviderProps) {
  const [userToken, setUserToken] = useState(
    () => Cookies.get('tvnsports_session') || '',
  )
  const [user, setUser] = useState({} as UserContextData['user'])

  function handleUserToken(token: string) {
    setUserToken(token)
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (userToken && userToken !== undefined) {
        const { data } = await api.get('/sessions', {
          params: {
            ticket: userToken,
          },
        })
        setUser(data.user)
      }
    }

    fetchUser()
  }, [userToken])

  return (
    <UserContext.Provider value={{ user, userToken, handleUserToken }}>
      {children}
    </UserContext.Provider>
  )
}