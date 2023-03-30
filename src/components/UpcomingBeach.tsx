import Image from 'next/image'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { formatInTimeZone } from 'date-fns-tz'

import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { teams } from '@/data'

import '@splidejs/react-splide/css'

import CBVP from '@/assets/CBVP.png'
import CBVPColor from '@/assets/Logo_Colorido.png'

export function UpcomingBeach() {
  const { data: videos } = useChannel(6)

  const { getBeachEvents } = useGetEvents(videos?.upcomming, teams)

  return (
    <section className="relative flex flex-col pb-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-dark-blue to-dark-blue mb-4">
      <h2 className="text-2xl font-bebas tracking-wider px-10 font-semibold mb-2">
        Próximos Jogos - Vôlei de Praia
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
          {getBeachEvents?.map((match) => (
            <SplideSlide key={match?.id} className="rounded-lg">
              <div className="min-h-full py-0 px-6 rounded-lg bg-gradient-to-t from-[rgba(205,255,255,0.28)0%] to-[rgba(2,236,255,0.1)100%] transition">
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
                        'hh:mm',
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between py-6">
                  <Image src={CBVPColor} alt="" width={100} height={100} />
                  <span className="font-bebas text-center text-2xl text-medium-yellow/90 mt-3">
                    {match?.processedData.court}
                  </span>
                  <div className="flex gap-2">
                    <span className="font-bebas text-center text-lg text-white">
                      {match?.processedData.step}
                    </span>
                    <span>|</span>
                    <span className="font-bebas text-center text-lg text-white">
                      {match?.processedData.day}
                    </span>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}
