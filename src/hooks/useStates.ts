import { useQuery } from '@tanstack/react-query'

import { getChannel } from '../lib/tvChannel'

export const useChannel = (channel: number) =>
  useQuery(['tvChannel', channel], () => getChannel(channel))
