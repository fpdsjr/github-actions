import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useContext } from 'react'

import { EffectFade, Navigation, Autoplay } from 'swiper'

import { UserContext } from '@/contexts/UserContext'
import { useChannel, useVerifyUserIsLogged } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { teams } from '@/data'
import { EChannel } from '@/dictionary'
import { MotionBall } from './MotionBall'
import { WithoutTeams } from './WithoutTeams'
import { WithTeams } from './WithTeams'

import praia1 from '@/assets/banners/praia-1.png'
import praia2 from '@/assets/banners/praia-2-espelhada.png'
import praia3 from '@/assets/banners/praia-3.png'
import praia4 from '@/assets/banners/praia-4.png'
import quadra1 from '@/assets/banners/quadra-1.png'
import quadra2 from '@/assets/banners/quadra-2.png'
import quadra3 from '@/assets/banners/quadra-3.png'

import 'swiper/css'
import 'swiper/css/effect-fade'

const images = [
  { src: praia3, alt: 'vôlei de praia', position: 'object-[76%,50%]' },
  { src: quadra3, alt: 'vôlei de quadra', position: 'object-[82%,50%]' },
  { src: praia1, alt: 'vôlei de praia', position: 'object-center' },
  { src: quadra1, alt: 'vôlei de quadra', position: 'object-center' },
  { src: praia2, alt: 'vôlei de praia', position: 'object-[92%,50%]' },
  { src: quadra2, alt: 'vôlei de quadra', position: 'object-center' },
  { src: praia4, alt: 'vôlei de praia', position: 'object-center' },
]

export function Hero() {
  const { data: videos, isLoading } = useChannel(EChannel.VoleiBrasil)

  const { firstTwoEvents } = useGetEvents(videos?.upcomming, teams)

  const { data: isUserLogged } = useVerifyUserIsLogged()

  const {
    handleOpenModal,
    shortToken,
    user,
    setIsSubscribeNow,
    handleWelcomeMessage,
  } = useContext(UserContext)

  return (
    <section className="relative lg:after:absolute lg:after:inset-0 lg:after:z-30 lg:after:bg-gradient-to-t lg:after:from-[rgb(3,14,65)10%] lg:after:via-[rgba(0,0,0,0)30%] lg:after:to-[rgba(4,0,61,0)20%] lg:h-screen">
      <div className="h-[90vh] absolute z-30 bg-gradient-to-t from-dark-blue w-full lg:hidden"></div>

      <Swiper
        slidesPerView={1}
        effect={'fade'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img.src}
              alt={img.alt}
              placeholder="blur"
              blurDataURL=""
              className={`w-full ${img.position} object-cover h-[90vh] relative lg:absolute lg:object-[50%,30%] lg:h-screen lg:brightness-[0.6]`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative z-40 -mt-40 text-center font-semibold pb-10 lg:hidden">
        <h1 className="font-paralucentDemiBoldItalic uppercase text-4xl lg:max-w-5xl lg:mx-auto">
          Canal Vôlei Brasil
        </h1>
        <p className="px-4 text-center text-[22px] font-medium tracking-tight mb-6 md:px-6 lg:px-0 lg:text-center">
          Tudo de vôlei em um só lugar!
        </p>
        <div className="px-4 flex justify-center md:px-6 lg:px-0 lg:justify-center">
          {user.id ? (
            <Link
              href={
                isUserLogged
                  ? '/videos/compre-aqui-superliga-de-volei-2022-2023/?indic=canal_volei_brasil'
                  : `/user/token?ct=${shortToken}&redirect=/videos/compre-aqui-superliga-de-volei-2022-2023/?indic=canal_volei_brasil`
              }
              className="uppercase bg-medium-blue text-white text-center font-paralucentDemiBoldItalic tracking-wide font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] lg:px-10 lg:text-2xl"
            >
              Quero assistir vôlei o ano todo!
            </Link>
          ) : (
            <button
              onClick={() => {
                setIsSubscribeNow(true)
                handleWelcomeMessage('assine agora')
                handleOpenModal()
              }}
              className="uppercase bg-medium-blue text-white text-center font-paralucentDemiBoldItalic tracking-wide font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] lg:px-10 lg:text-2xl"
            >
              Quero assistir vôlei o ano todo!
            </button>
          )}
        </div>
      </div>

      <div className="hidden lg:w-full lg:grid lg:grid-cols-[416px,1fr] lg:gap-8 lg:justify-center lg:items-center lg:top-0 lg:h-[90%] lg:z-40 lg:absolute lg:pl-[6%]">
        {firstTwoEvents && firstTwoEvents?.length > 0 ? (
          <div className="flex flex-col gap-4 lg:rounded-xl lg:bg-indigo-300/20 lg:backdrop-blur-lg lg:p-4">
            <h2 className="text-xl text-center font-paralucentDemiBoldItalic">
              Próximos jogos
            </h2>
            {isLoading ? (
              <MotionBall />
            ) : (
              <>
                {firstTwoEvents?.map((event) => {
                  return event?.description.includes('Circuito Brasileiro') ||
                    event?.description.includes('Campeonato Brasileiro') ? (
                    <WithoutTeams key={event.id} element={event} />
                  ) : (
                    <WithTeams key={event.id} element={event} />
                  )
                })}
              </>
            )}
          </div>
        ) : (
          <div className="w-[416px]"></div>
        )}

        <div className="text-center justify-center flex flex-col place-items-center font-semibold uppercase pb-10 lg:mx-auto lg:leading-snug">
          <Image
            src="/canal-volei-brasil.png"
            alt="Logo Canal Vôlei Brasil"
            width={400}
            height={130}
            placeholder="blur"
            blurDataURL="/canal-volei-brasil.png"
            className="block mb-4"
          />
          <p className="px-4 text-center text-[22px] font-medium tracking-tight mb-6 md:px-6 lg:px-0 lg:text-center">
            Tudo de vôlei em um só lugar!
          </p>
          <div className="px-4 flex justify-center md:px-6 lg:px-0 lg:justify-center">
            {user.id ? (
              <Link
                href={
                  isUserLogged
                    ? '/videos/compre-aqui-superliga-de-volei-2022-2023/?indic=canal_volei_brasil'
                    : `/user/token?ct=${shortToken}&redirect=/videos/compre-aqui-superliga-de-volei-2022-2023/?indic=canal_volei_brasil`
                }
                className="uppercase bg-medium-blue text-white text-center font-paralucentDemiBoldItalic tracking-wide font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] lg:px-10 lg:text-2xl"
              >
                Quero assistir vôlei o ano todo!
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsSubscribeNow(true)
                  handleWelcomeMessage('assine agora')
                  handleOpenModal()
                }}
                className="uppercase bg-medium-blue text-white text-center font-paralucentDemiBoldItalic tracking-wide font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] lg:px-10 lg:text-2xl"
              >
                Quero assistir vôlei o ano todo!
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
