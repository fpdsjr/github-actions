import { ITvChannel } from '@/interfaces'
import axios from 'axios'

const apiTvChannel = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_TV_CHANNEL_URL,
})

export const getChannel = async (channel: number) => {
  const { data } = await apiTvChannel.get<ITvChannel>(`/${channel}/videos/home`)
  return data.videos
}

// 6 - Canal Vôlei Brasil
