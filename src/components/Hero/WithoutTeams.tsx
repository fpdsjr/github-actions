import Image from 'next/image'
import { formatInTimeZone } from 'date-fns-tz'

import { IUpcoming } from '@/interfaces'

import CBVPColor from '@/assets/Logo_Colorido.png'

interface WithoutTeamsProps {
  firstElement: IUpcoming | undefined
}

export function WithoutTeams({ firstElement }: WithoutTeamsProps) {
  return (
    <div className="flex flex-col justify-center items-center lg:items-start">
      <span className="font-bebas text-2xl mt-1">
        {firstElement?.processedData.title}
      </span>

      <div className="px-4 pt-2 flex flex-col justify-center gap-2 text-4xl font-bold tracking-tight mb-3 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:justify-start">
        {firstElement?.description.includes('Campeonato Brasileiro') && (
          <Image
            src={'https://cbs.cbv.com.br/assets/images/logo-cbs.png'}
            alt=""
            width={100}
            height={100}
            className="invert"
          />
        )}

        {firstElement?.description.includes('Circuito Brasileiro') && (
          <Image src={CBVPColor} alt="" width={80} height={80} />
        )}

        <div className="flex flex-col">
          {firstElement?.processedData.court && (
            <span className="text-medium-yellow/90 text-xl">
              {firstElement?.processedData.court}
            </span>
          )}
          <div className="flex gap-2 items-center font-medium">
            {firstElement?.processedData.step && (
              <>
                <span>{firstElement?.processedData.step}</span>
                <span>|</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 mb-6 flex flex-col items-center gap-2 md:px-6 lg:px-0 lg:flex-row">
        <span className="font-bebas text-xl">
          {firstElement?.processedData.day}
        </span>

        <span className="hidden lg:flex lg:font-bebas lg:text-base">|</span>

        <div className="flex items-center gap-1">
          <span className="font-bebas text-xl">
            {firstElement &&
              formatInTimeZone(
                new Date(firstElement?.start_time),
                'Etc/Universal',
                'dd/MM/yyyy',
              )}
          </span>

          <span className="font-bebas text-xl">-</span>

          <span className="font-bebas text-xl">
            {firstElement &&
              formatInTimeZone(
                new Date(firstElement?.start_time),
                'Etc/Universal',
                'HH:mm',
              )}
          </span>
        </div>
      </div>
    </div>
  )
}
