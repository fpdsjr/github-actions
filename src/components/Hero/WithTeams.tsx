import Image from 'next/image'
import { formatInTimeZone } from 'date-fns-tz'

import { IUpcoming } from '@/interfaces'

interface WithTeamsProps {
  element: IUpcoming | undefined
}

export function WithTeams({ element }: WithTeamsProps) {
  return (
    <>
      <div className="px-4 flex items-center text-center text-4xl font-bold tracking-tight mb-1 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:text-start lg:rounded-xl lg:bg-black/30 lg:backdrop-blur-lg lg:p-4">
        <Image
          src={element?.processedData.homeTeamLogo ?? ''}
          alt=""
          width={100}
          height={100}
        />
        <span className="font-bebas text-2xl text-medium-yellow">VS</span>
        <Image
          src={element?.processedData.awayTeamLogo ?? ''}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="px-4 mb-6 flex items-center gap-2 md:px-6 lg:px-0">
        <span className="font-bebas text-lg">
          {element?.processedData.title}
        </span>

        <span className="font-bebas text-base">|</span>

        <div className="flex items-center gap-1">
          <span className="font-bebas text-lg">
            {element &&
              formatInTimeZone(
                new Date(element?.start_time),
                'Etc/Universal',
                'dd/MM/yyyy',
              )}
          </span>

          <span className="font-bebas text-lg">-</span>

          <span className="font-bebas text-lg">
            {element &&
              formatInTimeZone(
                new Date(element?.start_time),
                'Etc/Universal',
                'HH:mm',
              )}
          </span>
        </div>
      </div>
    </>
  )
}
