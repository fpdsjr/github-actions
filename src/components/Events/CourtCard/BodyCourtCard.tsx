import Image from 'next/image'

import { IUpcoming } from '@/interfaces'

interface BodyCourtCardProps {
  match: IUpcoming
}

export function BodyCourtCard({ match }: BodyCourtCardProps) {
  return (
    <>
      {match?.title.includes('Campeonato Brasileiro') ? (
        <div className="flex flex-col items-center justify-between py-6">
          <Image
            src="https://cbs.cbv.com.br/assets/images/logo-cbs.png"
            alt=""
            width={200}
            height={69}
          />
          <span className="font-bebas text-center text-2xl text-[#216ba5] mt-3">
            {match?.court}
          </span>
          <div className="flex gap-2">
            <span className="font-bebas text-center text-2xl text-white">
              {match?.day}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start py-6">
          <div className="flex flex-col items-center gap-3 w-[36%]">
            <Image
              src={match?.homeTeamLogo ?? ''}
              alt=""
              width={100}
              height={100}
            />
            <span className="font-bebas text-center text-lg text-[#216ba5]">
              {match?.homeTeam}
            </span>
          </div>

          <span className="text-bold font-bebas text-3xl self-center text-medium-yellow">
            VS
          </span>

          <div className="flex flex-col items-center gap-3 w-[36%]">
            <Image
              src={match?.awayTeamLogo ?? ''}
              alt=""
              width={100}
              height={100}
            />
            <span className="font-bebas text-center text-lg text-[#216ba5]">
              {match?.awayTeam}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
