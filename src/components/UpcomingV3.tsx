import Image from 'next/image'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { format } from 'date-fns'

import { useChannel } from '@/hooks/useStates'
import { teams } from '@/data'

import '@splidejs/react-splide/css'

import SLFem from '@/assets/logo_superliga_fem_4.png'
import SLMas from '@/assets/logo_superliga_masc_6.png'

export function UpcomingV3() {
  const { data: channel } = useChannel(6)

  const addTeamsToChannel = channel?.videos?.upcomming
    ?.map((upcomming) => {
      const title = upcomming.description.split(':')[0].trim()
      const homeTeam = upcomming.description.split(':')[1]?.split('x')[0].trim()
      const awayTeam = upcomming.description.split(':')[1]?.split('x')[1].trim()

      const findHomeTeamLogo = teams.find(
        (team) => team.nameFromAPI === homeTeam,
      )
      const findAwayTeamLogo = teams.find(
        (team) => team.nameFromAPI === awayTeam,
      )

      const newVideo = {
        ...upcomming,
        processedData: {
          title,
          homeTeam: findHomeTeamLogo?.name,
          homeTeamLogo: findHomeTeamLogo?.logo,
          homeTeamShort: findHomeTeamLogo?.shortName,
          awayTeam: findAwayTeamLogo?.name,
          awayTeamLogo: findAwayTeamLogo?.logo,
          awayTeamShort: findAwayTeamLogo?.shortName,
        },
      }

      return newVideo
    })
    .filter(
      (match) =>
        match.processedData.homeTeam !== undefined &&
        match.processedData.awayTeam !== undefined,
    )

  return (
    <section className="relative flex flex-col py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-medium-blue via-dark-blue to-dark-blue">
      {/* <div className="mx-auto max-w-4xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Todo mês 1 competição diferente
        </h2>
      </div>
      <p className="mx-auto mt-6 mb-16 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. i dolorem odio
        atque consequuntur illum saepe iste itaque doloribus. Omnis, sit at?
      </p> */}

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
          {addTeamsToChannel?.map((match) => (
            <SplideSlide key={match?.id} className="rounded-lg">
              <div className="min-h-full py-0 px-6 rounded-lg bg-gradient-to-b from-[rgba(255,255,255,0.2)0%] to-[rgba(255,255,255,0.6)100%] transition">
                <div className="flex justify-between items-center py-3 gap-2 border-b border-medium-yellow/70">
                  {match.processedData.title.includes('Feminina') && (
                    <Image src={SLFem} alt="" height={34} className="invert" />
                  )}
                  {match.processedData.title.includes('Masculina') && (
                    <Image src={SLMas} alt="" height={34} className="invert" />
                  )}

                  <div className="flex gap-2">
                    <span className="font-bebas text-lg">
                      {format(new Date(match.start_time), 'dd/MM/yyyy')}
                    </span>

                    <span>-</span>

                    <span className="font-bebas text-lg">
                      {format(new Date(match.start_time), 'HH:mm')}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-start py-6">
                  <div className="flex flex-col items-center gap-3 w-[36%]">
                    <Image
                      src={match.processedData.homeTeamLogo ?? ''}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <span className="font-bebas text-center text-lg text-white">
                      {match.processedData.homeTeam}
                    </span>
                  </div>

                  <span className="text-bold font-bebas text-2xl self-center text-medium-yellow/90">
                    VS
                  </span>

                  <div className="flex flex-col items-center gap-3 w-[36%]">
                    <Image
                      src={match.processedData.awayTeamLogo ?? ''}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <span className="font-bebas text-center text-lg text-white">
                      {match.processedData.awayTeam}
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
