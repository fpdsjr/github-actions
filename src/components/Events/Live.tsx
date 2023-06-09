import Link from 'next/link'
import { useContext } from 'react'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

import { UserContext } from '@/contexts/UserContext'
import { useChannel, useVerifyUserIsLogged } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { teams } from '@/data'
import { EChannel } from '@/dictionary'
import { IEvent } from '@/interfaces'
import { BeachCard } from './BeachCard'
import { CourtCard } from './CourtCard'

import '@splidejs/react-splide/css'

export function Live() {
  const { data: videos } = useChannel(EChannel.VoleiBrasil)
  let lives: IEvent[] = []

  const { getCourtEvents, getBeachEvents } = useGetEvents(videos?.lives, teams)

  if (getCourtEvents?.length && getBeachEvents?.length) {
    lives = getBeachEvents?.concat(getCourtEvents)
  } else if (getCourtEvents?.length) {
    lives = getCourtEvents
  } else if (getBeachEvents?.length) {
    lives = getBeachEvents
  }

  const {
    user,
    shortToken,
    setIsSubscribeNow,
    handleWelcomeMessage,
    handleOpenModal,
  } = useContext(UserContext)

  const { data: isUserLogged } = useVerifyUserIsLogged()

  return (
    <section className="relative flex flex-col mb-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-dark-blue to-dark-blue">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mt-2 mb-16 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Assista agora no Canal Vôlei Brasil
        </h2>
      </div>

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
          {lives?.map((match) => (
            <SplideSlide key={match?.id}>
              <div className="flex gap-2 items-center justify-center mb-1">
                <span className="flex h-2.5 w-2.5 absolute left-1/2 -translate-x-11">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="font-medium">Ao vivo</span>
              </div>

              {user.id ? (
                <Link
                  href={
                    isUserLogged
                      ? `/videos/${match.slug}`
                      : `/user/token?ct=${shortToken}&redirect=/videos/${match.slug}`
                  }
                >
                  {match?.type === 'beach' && <BeachCard match={match} />}
                  {match?.type === 'court' && <CourtCard match={match} />}
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
                  {match?.type === 'beach' && <BeachCard match={match} />}
                  {match?.type === 'court' && <CourtCard match={match} />}
                </button>
              )}
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}
