import Image from 'next/image'
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
// import b3 from '@/assets/banner-principal-1920x1080.jpg'
// import b4 from '@/assets/banner-principal-1920x1080-2.jpg'

import 'swiper/css'
import 'swiper/css/effect-fade'

const images = [
  { src: b1, alt: 'banner 1' },
  { src: b2, alt: 'banner 2' },
  // { src: b3, alt: 'banner 3' },
  // { src: b4, alt: 'banner 4' },
]

export function Hero() {
  const { data: videos, isFetching } = useChannel(6)

  const { typeFirstElement, firstElement } = useGetEvents(
    videos?.upcomming,
    teams,
  )

  return (
    <section className="relative lg:after:absolute lg:after:inset-0 lg:after:z-30 lg:after:bg-gradient-to-t lg:after:from-[rgb(3,14,65)10%] lg:after:to-[rgba(4,0,61,0)20%] lg:h-screen">
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
              className="w-full object-cover object-[50%,30%] h-[60vh] relative lg:absolute lg:h-screen lg:brightness-75"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col justify-center top-0 h-full z-40 lg:absolute lg:pl-[6%]">
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
      </div>
    </section>
  )
}
