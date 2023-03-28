import Head from 'next/head'

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { Categories } from '@/components/Categories'
import { Devices } from '@/components/Devices'
// import { Live } from '@/components/Live'
import { Footer } from '@/components/Footer'
import { Pictures } from '@/components/Pictures'
import { UpcomingBeach } from '@/components/UpcomingBeach'
import { Faq } from '@/components/Faq'
import { UpcomingCourt } from '@/components/UpcomingCourt'

export default function Home() {
  return (
    <>
      <Head>
        <title>Canal Vôlei Brasil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <Hero />
      <UpcomingBeach />
      <UpcomingCourt />
      <Categories />
      <Pricing />
      <Pictures />
      <Devices />

      <Faq />
      <Footer />
    </>
  )
}
