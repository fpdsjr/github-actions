import Image from 'next/image'
import { formatInTimeZone } from 'date-fns-tz'

import { IEvent } from '@/interfaces'

import SLFem from '@/assets/Logo_SL_Fem.png'
import SLMas from '@/assets/Logo_SL_Masc.png'

interface HeaderCourtCardProps {
  match: IEvent
}

export function HeaderCourtCard({ match }: HeaderCourtCardProps) {
  return (
    <div className="flex justify-between items-center py-3 gap-2 border-b border-medium-yellow/70">
      {match?.title.includes('Feminina') && (
        <Image src={SLFem} alt="" width={60} height={37} />
      )}
      {match?.title.includes('Masculina') && (
        <Image src={SLMas} alt="" width={60} height={37} />
      )}
      {match?.title.includes('Campeonato Brasileiro') && (
        <Image
          src="https://cbs.cbv.com.br/assets/images/logo-cbs.png"
          alt=""
          width={100}
          height={34}
        />
      )}

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
  )
}
