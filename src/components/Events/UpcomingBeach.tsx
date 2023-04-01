import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { teams } from '@/data'
import { EChannel } from '@/dictionary'

import '@splidejs/react-splide/css'

import { BeachCard } from './BeachCard'

export function UpcomingBeach() {
  const { data: videos } = useChannel(EChannel.VoleiBrasil)

  const { getBeachEvents } = useGetEvents(videos?.upcomming, teams)

  return (
    <section className="relative flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-dark-blue to-dark-blue mb-4">
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
              <BeachCard match={match} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}
