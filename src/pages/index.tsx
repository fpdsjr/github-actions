import Head from 'next/head'

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { Categories } from '@/components/Categories'
import { Devices } from '@/components/Devices'
import { Footer } from '@/components/Footer'
import { Pictures } from '@/components/Pictures'
import { UpcomingBeach } from '@/components/UpcomingBeach'
import { Faq } from '@/components/Faq'
import { UpcomingCourt } from '@/components/UpcomingCourt'
import { teams } from '@/data'
import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'

export default function Home() {
  const { data: videos } = useChannel(6)

  const { getBeachEvents, getCourtEvents } = useGetEvents(
    videos?.upcomming,
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

      <div className="lg:z-30 lg:relative lg:-mt-20">
        {getBeachEvents && getBeachEvents?.length > 0 && <UpcomingBeach />}
        {getCourtEvents && getCourtEvents?.length > 0 && <UpcomingCourt />}
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
