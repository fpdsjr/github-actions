import { ReactNode, createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { api } from '@/lib'

enum EWelcomeMessage {
  'entrar' = 'Siga o passo a passo para realizar o seu login ou o seu cadastro.',
  'assine agora' = 'Faça o seu login ou cadastro para continuar.',
}

type WelcomeMessage = keyof typeof EWelcomeMessage

interface UserContextData {
  userToken: string
  isOpen: boolean
  forgotPassword: boolean
  isSubscribeNow: boolean
  welcomeMessage: string
  handleUserToken: (token: string) => void
  handleOpenModal: () => void
  handleCloseModal: () => void
  handleForgotPassword: () => void
  handleLogout: () => void
  setIsSubscribeNow: (value: boolean) => void
  handleWelcomeMessage: (message: WelcomeMessage) => void
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
  const [isOpen, setIsOpen] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isSubscribeNow, setIsSubscribeNow] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState('')

  function handleUserToken(token: string) {
    setUserToken(token)
  }

  function handleOpenModal() {
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
    setIsSubscribeNow(false)
  }

  function handleForgotPassword() {
    setForgotPassword(!forgotPassword)
  }

  function handleLogout() {
    Cookies.remove('tvnsports_session')
    setUser({} as UserContextData['user'])
  }

  function handleWelcomeMessage(message: WelcomeMessage) {
    setWelcomeMessage(EWelcomeMessage[message])
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
    <UserContext.Provider
      value={{
        user,
        userToken,
        handleUserToken,
        isOpen,
        handleOpenModal,
        handleCloseModal,
        forgotPassword,
        handleForgotPassword,
        handleLogout,
        isSubscribeNow,
        setIsSubscribeNow,
        handleWelcomeMessage,
        welcomeMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
