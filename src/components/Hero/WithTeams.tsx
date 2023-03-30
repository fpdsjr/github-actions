import Image from 'next/image'
import { formatInTimeZone } from 'date-fns-tz'
import { IUpcoming } from '@/interfaces'

interface WithTeamsProps {
  firstElement: IUpcoming | undefined
}

export function WithTeams({ firstElement }: WithTeamsProps) {
  return (
    <>
      <div className="px-4 flex items-center text-center text-4xl font-bold tracking-tight mb-1 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:text-start">
        <Image
          src={firstElement?.processedData.homeTeamLogo ?? ''}
          alt=""
          width={100}
          height={100}
        />
        <span className="font-bebas text-2xl text-medium-yellow">VS</span>
        <Image
          src={firstElement?.processedData.awayTeamLogo ?? ''}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="px-4 mb-6 flex items-center gap-2 md:px-6 lg:px-0">
        <span className="font-bebas text-lg">
          {firstElement?.processedData.title}
        </span>

        <span className="font-bebas text-base">|</span>

        <div className="flex items-center gap-1">
          <span className="font-bebas text-lg">
            {firstElement &&
              formatInTimeZone(
                new Date(firstElement?.start_time),
                'Etc/Universal',
                'dd/MM/yyyy',
              )}
          </span>

          <span className="font-bebas text-lg">-</span>

          <span className="font-bebas text-lg">
            {firstElement &&
              formatInTimeZone(
                new Date(firstElement?.start_time),
                'Etc/Universal',
                'HH:mm',
              )}
          </span>
        </div>
      </div>
    </>
  )
}
