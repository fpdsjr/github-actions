import Head from 'next/head'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { Categories } from '@/components/Categories'
import { Devices } from '@/components/Devices'
// import { Live } from '@/components/Live'
import { Upcoming } from '@/components/Upcoming'
import { Footer } from '@/components/Footer'
import { Pictures } from '@/components/Pictures'
import { UpcomingV2 } from '@/components/UpcomingV2'
import { Faq } from '@/components/Faq'
import { UpcomingV3 } from '@/components/UpcomingV3'
import { getChannel } from '@/lib/tvChannel'

export default function Home() {
  return (
    <>
      <Head>
        <title>Canal Vôlei Brasil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <Hero />
      {/* <Live /> */}
      <UpcomingV2 />
      <UpcomingV3 />
      <Upcoming />
      <Categories />
      <Pricing />
      <Pictures />
      <Devices />

      <Faq />
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.fetchQuery(['tvChannel'], () => getChannel(6))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
