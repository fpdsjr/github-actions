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
import b3 from '@/assets/banner-principal-1920x1080.jpg'
import b4 from '@/assets/banner-principal-1920x1080-2.jpg'

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

  const { typeFirstElement, firstElement } = useGetEvents(
    videos?.upcomming,
    teams,
  )

  return (
    <section className="relative lg:before:absolute lg:before:inset-0 lg:before:z-20 lg:before:bg-gradient-to-r lg:before:from-[rgba(3,14,65,0.96)10%] lg:before:to-[rgba(4,0,61,0)85%] lg:after:absolute lg:after:inset-0 lg:after:z-30 lg:after:bg-gradient-to-t lg:after:from-[rgb(3,14,65)10%] lg:after:to-[rgba(4,0,61,0)20%] lg:h-screen">
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
              className="w-full object-cover object-[50%,30%] h-[60vh] relative lg:absolute lg:h-[90vh]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col justify-center top-0 h-full z-40 lg:absolute lg:pl-[6%]">
        <h1 className="px-4 text-center font-paralucentDemiBoldItalic text-5xl uppercase tracking-wider flex flex-col mb-3 md:px-6 md:block lg:px-0 lg:text-start">
          <strong>Novo Canal Vôlei Brasil</strong>
        </h1>
        <div className="h-10 bg-gradient-to-r from-medium-blue flex items-center justify-center mb-8 lg:mb-3 lg:w-[28rem] lg:-ml-44 lg:justify-start lg:-skew-x-12 lg:to-transparent">
          <span className="text-xl font-medium -skew-x-12 lg:skew-x-0 lg:ml-44">
            Assista ao vivo
          </span>
        </div>

        {isFetching ? (
          <MotionBall />
        ) : (
          <>
            {typeFirstElement === 'withoutTeams' ? (
              <WithoutTeams firstElement={firstElement} />
            ) : (
              <WithTeams firstElement={firstElement} />
            )}
          </>
        )}

        <p className="px-4 text-center text-[22px] font-light tracking-tight mb-6 md:px-6 lg:px-0 lg:text-start">
          Assista às maiores competições de voleibol do país
        </p>
        <div className="px-4 flex justify-center md:px-6 lg:px-0 lg:justify-start">
          <Link
            href=""
            className="uppercase bg-medium-blue text-white text-center font-paralucentDemiBoldItalic tracking-wide font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] lg:px-10 lg:text-2xl"
          >
            Quero assistir vôlei o ano todo!
          </Link>
        </div>
      </div>
    </section>
  )
}
