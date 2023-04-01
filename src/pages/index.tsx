import Head from 'next/head'

import { teams } from '@/data'
import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { Categories } from '@/components/Categories'
import { Devices } from '@/components/Devices'
import { Footer } from '@/components/Footer'
import { Pictures } from '@/components/Pictures'
import { Faq } from '@/components/Faq'
import { UpcomingBeach } from '@/components/Events/UpcomingBeach'
import { UpcomingCourt } from '@/components/Events/UpcomingCourt'
import { Live } from '@/components/Events/Live'

export default function Home() {
  const { data: videos } = useChannel(6)

  const { getBeachEvents: liveBeach, getCourtEvents: liveCourt } = useGetEvents(
    videos?.lives,
    teams,
  )

  const { getBeachEvents: upcomingBeach, getCourtEvents: upcomingCourt } =
    useGetEvents(videos?.upcomming, teams)

  return (
    <>
      <Head>
        <title>Canal Vôlei Brasil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <Hero />

      <div className=" flex flex-col gap-6 lg:z-30 lg:relative lg:-mt-20">
        {(liveBeach?.length || liveCourt?.length) && <Live />}
        {upcomingBeach?.length && <UpcomingBeach />}
        {upcomingCourt?.length && <UpcomingCourt />}
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
