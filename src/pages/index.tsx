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

export default function Home() {
  return (
    <>
      <Head>
        <title>Canal Vôlei Brasil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <Hero />

      <div className="lg:z-30 lg:relative lg:-mt-52">
        <h1 className="text-3xl text-center font-semibold font-paralucentDemiBoldItalic uppercase pb-10 bg-gradient-to-t from-dark-blue lg:text-5xl">
          Assista às maiores competições
        </h1>
        <UpcomingBeach />
        <UpcomingCourt />
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
