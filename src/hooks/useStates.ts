import { useQuery } from '@tanstack/react-query'

import { fetchVerifyUserIsLogged, getChannel } from '../lib'

export const useChannel = (channel: number) =>
  useQuery(['tvChannel', channel], () => getChannel(channel), {
    refetchOnWindowFocus: true,
  })

export const useVerifyUserIsLogged = () =>
  useQuery(['isUserLogged'], () => fetchVerifyUserIsLogged())
