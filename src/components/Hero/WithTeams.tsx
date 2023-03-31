import Image from 'next/image'
import { formatInTimeZone } from 'date-fns-tz'

import { IUpcoming } from '@/interfaces'

interface WithTeamsProps {
  element: IUpcoming | undefined
}

export function WithTeams({ element }: WithTeamsProps) {
  return (
    <div className="lg:rounded-xl lg:p-4 lg:bg-black/50 lg:backdrop-blur-lg">
      <span className="font-bebas tracking-wide text-2xl">
        {element?.processedData.title}
      </span>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold tracking-tight md:max-w-none">
          <Image
            src={element?.processedData.homeTeamLogo ?? ''}
            alt=""
            width={100}
            height={100}
          />
          <span className="text-bold font-bebas text-2xl self-center text-medium-yellow/90">
            VS
          </span>
          <Image
            src={element?.processedData.awayTeamLogo ?? ''}
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-bebas tracking-wide text-xl">
            {element &&
              formatInTimeZone(
                new Date(element?.start_time),
                'Etc/Universal',
                'dd/MM/yyyy',
              )}
          </span>

          <span className="font-bebas tracking-wide text-xl">
            {element &&
              formatInTimeZone(
                new Date(element?.start_time),
                'Etc/Universal',
                'HH:mm',
              )}
          </span>
        </div>
      </div>
    </div>
  )
}
