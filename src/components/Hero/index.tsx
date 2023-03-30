import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

import { EffectFade, Navigation, Autoplay } from 'swiper'

import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { teams } from '@/data'
import { MotionBall } from './MotionBall'
import { WithoutTeams } from './WithoutTeams'
import { WithTeams } from './WithTeams'

import b1 from '@/assets/aberto_m_jogo19_1811-1630.jpg'
import b2 from '@/assets/aberto_f_final_1911-3697.jpg'
import b3 from '@/assets/banner-principal-1920x1080-4.jpg'
import b4 from '@/assets/banner-principal-1920x1080-3.jpg'

import 'swiper/css'
import 'swiper/css/effect-fade'

const images = [
  { src: b1, alt: 'banner 1' },
  { src: b2, alt: 'banner 2' },
  { src: b3, alt: 'banner 3' },
  { src: b4, alt: 'banner 4' },
]

export function Hero() {
  const { data: videos, isFetching } = useChannel(6)

  const { typeFirstElement, firstElement, typeSecondElement, secondElement } =
    useGetEvents(videos?.upcomming, teams)

  return (
    <section className="relative lg:after:absolute lg:after:inset-0 lg:after:z-30 lg:after:bg-gradient-to-t lg:after:from-[rgb(3,14,65)10%] lg:after:via-[rgba(0,0,0,0)30%] lg:after:to-[rgba(4,0,61,0)20%] lg:h-screen">
      <div className="h-[60vh] absolute z-30 bg-gradient-to-t from-dark-blue w-full lg:hidden"></div>

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
        {images.map((img) => (
          <SwiperSlide key={img.alt}>
            <Image
              src={img.src}
              alt={img.alt}
              placeholder="blur"
              blurDataURL=""
              className="w-full object-cover object-[50%,30%] h-[60vh] relative lg:absolute lg:h-screen lg:brightness-[0.6]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden lg:grid lg:grid-cols-[416px,1fr] lg:gap-8 lg:justify-center lg:items-center lg:top-0 lg:h-[90%] lg:z-40 lg:absolute lg:pl-[6%]">
        <div className="flex flex-col gap-4 lg:rounded-xl lg:bg-indigo-300/20 lg:backdrop-blur-lg lg:p-4">
          <h2 className="text-xl text-center font-paralucentDemiBoldItalic">
            Próximos jogos
          </h2>
          {isFetching ? (
            <MotionBall />
          ) : (
            <>
              {typeFirstElement === 'withoutTeams' ? (
                <WithoutTeams element={firstElement} />
              ) : (
                <WithTeams element={firstElement} />
              )}

              {typeSecondElement === 'withoutTeams' ? (
                <WithoutTeams element={secondElement} />
              ) : (
                <WithTeams element={secondElement} />
              )}
            </>
          )}
        </div>

        <div className="text-3xl text-center font-semibold uppercase pb-10 lg:mx-auto lg:leading-snug lg:text-5xl">
          <h1 className="font-paralucentDemiBoldItalic lg:max-w-5xl lg:mx-auto">
            Assista aos maiores campeonatos de vôlei do Brasil
          </h1>
          <p className="px-4 text-center text-[22px] font-medium tracking-tight mb-6 md:px-6 lg:px-0 lg:text-center">
            Tudo em um só canal
          </p>
          <div className="px-4 flex justify-center md:px-6 lg:px-0 lg:justify-center">
            <Link
              href="#"
              className="uppercase bg-medium-blue text-white text-center font-paralucentDemiBoldItalic tracking-wide font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] lg:px-10 lg:text-2xl"
            >
              Quero assistir vôlei o ano todo!
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
