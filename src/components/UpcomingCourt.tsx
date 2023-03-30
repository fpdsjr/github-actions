import Image from 'next/image'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { formatInTimeZone } from 'date-fns-tz'

import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { teams } from '@/data'

import '@splidejs/react-splide/css'

import SLFem from '@/assets/Logo_SL_Fem.png'
import SLMas from '@/assets/Logo_SL_Masc.png'

export function UpcomingCourt() {
  const { data: videos } = useChannel(6)

  const { getCourtEvents } = useGetEvents(videos?.upcomming, teams)

  return (
    <section className="relative flex flex-col py-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-dark-blue to-dark-blue">
      <h2 className="text-2xl font-bebas tracking-wider px-10 font-semibold mb-3">
        Próximos Jogos - Vôlei de Quadra
      </h2>

      <Splide
        hasTrack={false}
        options={{
          perPage: 4,
          gap: '1.2rem',
          padding: 40,
          rewind: true,
          breakpoints: {
            768: {
              perPage: 1,
              gap: '0.6rem',
              padding: 20,
            },
            1200: {
              perPage: 2,
            },
            1440: {
              perPage: 3,
            },
          },
        }}
      >
        <SplideTrack>
          {getCourtEvents?.map((match) => (
            <SplideSlide key={match?.id} className="rounded-lg">
              <div className="min-h-full py-0 px-6 rounded-lg bg-gradient-to-b from-[rgba(255,255,255,0.13)0%] to-[rgba(255,255,255,0.5)100%] transition">
                <div className="flex justify-between items-center py-3 gap-2 border-b border-medium-yellow/70">
                  {match?.processedData.title.includes('Feminina') && (
                    <Image src={SLFem} alt="" height={34} className="invert" />
                  )}
                  {match?.processedData.title.includes('Masculina') && (
                    <Image src={SLMas} alt="" height={34} className="invert" />
                  )}
                  {match?.processedData.title.includes(
                    'Campeonato Brasileiro',
                  ) && (
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

                {match?.processedData.title.includes(
                  'Campeonato Brasileiro',
                ) ? (
                  <div className="flex flex-col items-center justify-between py-6">
                    <Image
                      src="https://cbs.cbv.com.br/assets/images/logo-cbs.png"
                      alt=""
                      width={200}
                      height={200}
                    />
                    <span className="font-bebas text-center text-2xl text-medium-yellow/90 mt-3">
                      {match?.processedData.court}
                    </span>
                    <div className="flex gap-2">
                      <span className="font-bebas text-center text-lg text-white">
                        {match?.processedData.day}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start py-6">
                    <div className="flex flex-col items-center gap-3 w-[36%]">
                      <Image
                        src={match?.processedData.homeTeamLogo ?? ''}
                        alt=""
                        width={100}
                        height={100}
                      />
                      <span className="font-bebas text-center text-lg text-white">
                        {match?.processedData.homeTeam}
                      </span>
                    </div>

                    <span className="text-bold font-bebas text-2xl self-center text-medium-yellow/90">
                      VS
                    </span>

                    <div className="flex flex-col items-center gap-3 w-[36%]">
                      <Image
                        src={match?.processedData.awayTeamLogo ?? ''}
                        alt=""
                        width={100}
                        height={100}
                      />
                      <span className="font-bebas text-center text-lg text-white">
                        {match?.processedData.awayTeam}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}
