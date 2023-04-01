import { formatInTimeZone } from 'date-fns-tz'
import Image from 'next/image'

import { IUpcoming } from '@/interfaces'

import CBVP from '@/assets/CBVP.png'
import CBVPColor from '@/assets/Logo_Colorido.png'

interface BeachCardProps {
  match: IUpcoming
}

export function BeachCard({ match }: BeachCardProps) {
  return (
    <div className="h-[273.28px] py-0 px-6 rounded-lg bg-gradient-to-t from-[rgba(205,255,255,0.28)0%] to-[rgba(2,236,255,0.1)100%]">
      <div className="flex justify-between items-center py-3 gap-2 border-b border-medium-yellow/70">
        <Image src={CBVP} alt="" height={34} />

        <div className="flex gap-2">
          <span className="font-bebas text-lg">
            {formatInTimeZone(
              new Date(match?.start_time),
              'Etc/Universal',
              'dd/MM/yyyy',
            )}
          </span>

          <span>-</span>

          <span className="font-bebas text-lg">
            {formatInTimeZone(
              new Date(match?.start_time),
              'Etc/Universal',
              'HH:mm',
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between py-6">
        <Image src={CBVPColor} alt="" width={100} height={100} />
        <span className="font-bebas text-center text-2xl text-medium-yellow/90 mt-3">
          {match?.court}
        </span>
        <div className="flex gap-2">
          <span className="font-bebas text-center text-lg text-white">
            {match?.step}
          </span>
          <span>|</span>
          <span className="font-bebas text-center text-lg text-white">
            {match?.day}
          </span>
        </div>
      </div>
    </div>
  )
}
