import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

import '@splidejs/react-splide/css'

import { IEvent } from '@/interfaces'
import { CourtCard } from './CourtCard'

interface CourtEventsProps {
  title: string
  events: IEvent[]
}

export function CourtEvents({ title, events }: CourtEventsProps) {
  return (
    <section className="relative flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-dark-blue to-dark-blue">
      <h2 className="text-2xl font-bebas tracking-wider px-10 font-semibold mb-2">
        {title}
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
          {events?.map((event) => (
            <SplideSlide key={event?.id} className="rounded-lg">
              <CourtCard match={event} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}