import Image from 'next/image'
import { formatInTimeZone } from 'date-fns-tz'

import { IUpcoming } from '@/interfaces'

import CBVPColor from '@/assets/Logo_Colorido.png'

interface WithoutTeamsProps {
  element: IUpcoming | undefined
}

export function WithoutTeams({ element }: WithoutTeamsProps) {
  return (
    <div className="flex flex-col items-center w-96 h-36 lg:items-start lg:rounded-xl lg:bg-black/30 lg:backdrop-blur-lg lg:p-4">
      <span className="font-bebas tracking-wide text-2xl mt-1">
        {element?.processedData.title}
      </span>

      <div className="px-4 pt-2 flex flex-col justify-center items-center gap-2 text-4xl font-bold tracking-tight mb-3 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:items-start lg:justify-start">
        {element?.description.includes('Campeonato Brasileiro') && (
          <Image
            src={'https://cbs.cbv.com.br/assets/images/logo-cbs.png'}
            alt=""
            width={100}
            height={100}
            className="invert absolute right-4 bottom-4"
          />
        )}

        {element?.description.includes('Circuito Brasileiro') && (
          <Image
            src={CBVPColor}
            alt=""
            width={60}
            height={60}
            className="absolute right-4 bottom-4"
          />
        )}

        <div className="flex gap-2 items-center">
          {element?.processedData.court && (
            <span className="text-medium-yellow/90 text-xl">
              {element?.processedData.court}
            </span>
          )}

          {element?.processedData.step && (
            <>
              <span className="text-lg font-normal">|</span>
              <span className="text-xl">{element?.processedData.step}</span>
            </>
          )}
        </div>
      </div>
      <div className="px-4 flex flex-col items-center gap-2 md:px-6 lg:px-0 lg:flex-row">
        <span className="font-bebas text-xl">{element?.processedData.day}</span>

        <span className="hidden lg:flex lg:font-bebas lg:text-base">|</span>

        <div className="flex items-center gap-1">
          <span className="font-bebas tracking-wide text-xl">
            {element &&
              formatInTimeZone(
                new Date(element?.start_time),
                'Etc/Universal',
                'dd/MM/yyyy',
              )}
          </span>

          <span className="font-bebas text-xl">-</span>

          <span className="font-bebas text-xl">
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
