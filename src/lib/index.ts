import axios from 'axios'

import { ITvChannel } from '@/interfaces'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const getChannel = async (channel: number) => {
  const { data } = await api.get<ITvChannel>(`/channels/${channel}/videos/home`)
  return data.videos
}

export const apiUsers = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

export const fetchVerifyUserIsLogged = async () => {
  const { data } = await apiUsers.get('/users/verify')
  return data.logged
}
