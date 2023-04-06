import Link from 'next/link'
import { useContext } from 'react'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

import '@splidejs/react-splide/css'

import { UserContext } from '@/contexts/UserContext'
import { IEvent } from '@/interfaces'
import { BeachCard } from './BeachCard'

interface BeachEventsProps {
  title: string
  events: IEvent[]
}

export function BeachEvents({ title, events }: BeachEventsProps) {
  const {
    shortToken,
    user,
    setIsSubscribeNow,
    handleOpenModal,
    handleWelcomeMessage,
  } = useContext(UserContext)

  return (
    <section className="relative mb-4 flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-dark-blue to-dark-blue">
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
          {events
            ?.sort(
              (a, b) =>
                new Date(a.start_time).getTime() -
                new Date(b.start_time).getTime(),
            )
            .map((event) => (
              <SplideSlide key={event?.id} className="rounded-lg">
                {user.id ? (
                  <Link
                    href={`https://canalvoleibrasil.cbv.com.br/user/token?ct=${shortToken}&redirect=/videos/${event.slug}`}
                  >
                    <BeachCard match={event} />
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsSubscribeNow(true)
                      handleWelcomeMessage('assine agora')
                      handleOpenModal()
                    }}
                    className="w-full"
                  >
                    <BeachCard match={event} />
                  </button>
                )}
              </SplideSlide>
            ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}
