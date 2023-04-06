import Head from 'next/head'
import { useRouter } from 'next/router'

import { teams } from '@/data'
import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { useResetUrlHome } from '@/hooks/useResetUrlHome'
import { EChannel } from '@/dictionary'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { Categories } from '@/components/Categories'
import { Devices } from '@/components/Devices'
import { Footer } from '@/components/Footer'
import { Pictures } from '@/components/Pictures'
import { Faq } from '@/components/Faq'
import { BeachEvents } from '@/components/Events/BeachEvents'
import { CourtEvents } from '@/components/Events/CourtEvents'
import { Live } from '@/components/Events/Live'

export default function Home() {
  const { data: videos } = useChannel(EChannel.VoleiBrasil)

  const router = useRouter()
  useResetUrlHome(router?.asPath)

  const { getBeachEvents: liveBeach, getCourtEvents: liveCourt } = useGetEvents(
    videos?.lives,
    teams,
  )

  const { getBeachEvents: upcomingBeach, getCourtEvents: upcomingCourt } =
    useGetEvents(videos?.upcomming, teams)

  const { getCourtEvents: previousCourt } = useGetEvents(
    videos?.by_categories['Jogos Anteriores'],
    teams,
  )

  const { getBeachEvents: previousBeach } = useGetEvents(
    videos?.by_categories['Circuito Brasileiro de Vôlei de Praia'],
    teams,
  )

  return (
    <>
      <Head>
        <title>Canal Vôlei Brasil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <Hero />

      <div className=" flex flex-col gap-6 lg:z-30 lg:relative lg:-mt-20">
        {((liveBeach && liveBeach?.length > 0) ||
          (liveCourt && liveCourt?.length > 0)) && <Live />}

        {upcomingBeach && upcomingBeach?.length > 0 && (
          <BeachEvents
            title="Próximos Jogos - Vôlei de Praia"
            events={upcomingBeach}
          />
        )}

        {upcomingCourt && upcomingCourt?.length > 0 && (
          <CourtEvents
            title="Próximos Jogos - Vôlei de Quadra"
            events={upcomingCourt}
          />
        )}

        {upcomingCourt?.length === 0 &&
          previousCourt &&
          previousCourt?.length > 0 && (
            <CourtEvents
              title="Jogos Anteriores - Vôlei de Quadra"
              events={previousCourt}
            />
          )}

        {upcomingBeach?.length === 0 &&
          previousBeach &&
          previousBeach?.length > 0 && (
            <BeachEvents
              title="Jogos Anteriores - Vôlei de Praia"
              events={previousBeach}
            />
          )}
      </div>

      <Pricing />
      <Categories />
      <Devices />
      <Pictures />

      <Faq />
      <Footer />
    </>
  )
}
