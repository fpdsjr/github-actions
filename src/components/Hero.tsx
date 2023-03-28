import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatInTimeZone } from 'date-fns-tz'
import { Swiper, SwiperSlide } from 'swiper/react'

import { EffectFade, Navigation, Autoplay } from 'swiper'

import { useChannel } from '@/hooks/useStates'
import { useGetEvents } from '@/hooks/useGetEvents'
import { teams } from '@/data'

import CBVPColor from '@/assets/Logo_Colorido.png'
import ball from '@/assets/bola-de-voleibol.png'
import bannerM from '@/assets/aberto_m_jogo19_1811-1630.jpg'
import bannerF from '@/assets/aberto_f_final_1911-3697.jpg'

import 'swiper/css'
import 'swiper/css/effect-fade'

const images = [
  { src: bannerM, alt: 'banner masculino' },
  { src: bannerF, alt: 'banner feminino' },
]

export function Hero() {
  const { data: videos, isFetching } = useChannel(6)

  const { typeFirstElement, firstElement } = useGetEvents(
    videos?.upcomming,
    teams,
  )

  return (
    <section className="relative lg:before:absolute lg:before:inset-0 lg:before:z-20 lg:before:bg-gradient-to-r lg:before:from-[rgba(3,14,65,0.96)30%] lg:before:to-[rgba(4,0,61,0)85%] lg:after:absolute lg:after:inset-0 lg:after:z-30 lg:after:bg-gradient-to-t lg:after:from-[rgb(3,14,65)2%] lg:after:to-[rgba(4,0,61,0)40%] lg:h-[90vh]">
      <div className="h-[60vh] absolute z-30 bg-gradient-to-t from-dark-blue w-full lg:hidden"></div>

      <Swiper
        slidesPerView={1}
        effect={'fade'}
        autoplay={{
          delay: 50000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="h-full"
      >
        {images.map((img) => (
          <SwiperSlide key={img.alt}>
            <Image
              key={img.alt}
              src={img.src}
              alt={img.alt}
              placeholder="blur"
              blurDataURL=""
              className="w-full object-cover h-[60vh] relative lg:absolute lg:h-[90vh]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col justify-center top-0 h-full z-40 lg:absolute lg:pl-[6%]">
        <h1 className="px-4 text-center text-5xl uppercase tracking-tight flex flex-col mb-3 md:px-6 md:block lg:px-0 lg:text-start">
          <strong>Novo Canal Vôlei Brasil</strong>
        </h1>
        <div className="h-10 bg-gradient-to-r from-sky-300 flex items-center justify-center mb-8 lg:mb-3 lg:w-[28rem] lg:-ml-44 lg:justify-start lg:-skew-x-12 lg:to-transparent">
          <span className="text-xl font-medium italic -skew-x-12 lg:skew-x-0 lg:ml-44">
            Assista ao vivo
          </span>
        </div>

        {isFetching ? (
          <div className="flex flex-col justify-start h-40">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={ball}
                alt=""
                width={100}
                height={100}
                className="opacity-80"
              />
            </motion.div>
          </div>
        ) : (
          <>
            {typeFirstElement === 'withoutTeams' ? (
              <div className="flex flex-col justify-center items-center lg:items-start">
                <div className="px-4 py-2 flex items-center justify-center gap-2 text-4xl font-bold tracking-tight mb-3 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:justify-start">
                  <Image src={CBVPColor} alt="" width={80} height={80} />

                  <div className="flex flex-col text-lg">
                    <span className="text-medium-yellow/90">
                      {firstElement?.processedData.court}
                    </span>
                    <div className="flex gap-2 items-center font-medium">
                      <span>{firstElement?.processedData.step}</span>
                      <span>|</span>
                      <span>{firstElement?.processedData.day}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 mb-6 flex flex-col items-center gap-2 md:px-6 lg:px-0 lg:flex-row">
                  <span className="font-bebas text-lg">
                    {firstElement?.processedData.title}
                  </span>

                  <span className="hidden font-bebas text-base">|</span>

                  <div className="flex items-center gap-1">
                    <span className="font-bebas text-lg">
                      {firstElement &&
                        formatInTimeZone(
                          new Date(firstElement?.start_time),
                          'Etc/Universal',
                          'dd/MM/yyyy',
                        )}
                    </span>

                    <span className="font-bebas text-lg">-</span>

                    <span className="font-bebas text-lg">
                      {firstElement &&
                        formatInTimeZone(
                          new Date(firstElement?.start_time),
                          'Etc/Universal',
                          'HH:mm',
                        )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="px-4 flex items-center text-center text-4xl font-bold tracking-tight mb-1 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:text-start">
                  <Image
                    src={firstElement?.processedData.homeTeamLogo ?? ''}
                    alt=""
                    width={100}
                    height={100}
                  />
                  <span className="font-bebas text-2xl text-medium-yellow">
                    VS
                  </span>
                  <Image
                    src={firstElement?.processedData.awayTeamLogo ?? ''}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="px-4 mb-6 flex items-center gap-2 md:px-6 lg:px-0">
                  <span className="font-bebas text-lg">
                    {firstElement?.processedData.title}
                  </span>

                  <span className="font-bebas text-base">|</span>

                  <div className="flex items-center gap-1">
                    <span className="font-bebas text-lg">
                      {firstElement &&
                        formatInTimeZone(
                          new Date(firstElement?.start_time),
                          'Etc/Universal',
                          'dd/MM/yyyy',
                        )}
                    </span>

                    <span className="font-bebas text-lg">-</span>

                    <span className="font-bebas text-lg">
                      {firstElement &&
                        formatInTimeZone(
                          new Date(firstElement?.start_time),
                          'Etc/Universal',
                          'HH:mm',
                        )}
                    </span>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <p className="px-4 text-center text-[22px] font-light tracking-tight mb-6 md:px-6 lg:px-0 lg:text-start">
          Assista às maiores competições de voleibol do país
        </p>
        <h1 className="px-4 text-center text-5xl uppercase tracking-tight flex flex-col mb-3 md:px-6 md:block lg:px-0 lg:text-start">
          <strong>Dis beatae</strong>
        </h1>
        <h3 className="px-4 text-center uppercase font-medium text-4xl tracking-tight mb-6 md:px-6 lg:px-0 lg:text-start">
          Lorem ipsum dolor sit
        </h3>
        <div className="px-4 flex justify-center md:px-6 lg:px-0 lg:justify-start">
          <Link
            href=""
            className="uppercase bg-sky-300 text-zinc-900 italic font-semibold text-base px-4 py-2 rounded-md transition hover:brightness-125 hover:scale-[1.02] lg:px-10"
          >
            Quero assistir vôlei o ano todo!
          </Link>
        </div>
      </div>
    </section>
  )
}
