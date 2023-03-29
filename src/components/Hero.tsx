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
        <h1 className="px-4 text-center italic text-5xl uppercase tracking-tight flex flex-col mb-3 md:px-6 md:block lg:px-0 lg:text-start">
          <strong>Novo Canal Vôlei Brasil</strong>
        </h1>
        <div className="h-10 bg-gradient-to-r from-medium-blue flex items-center justify-center mb-8 lg:mb-3 lg:w-[28rem] lg:-ml-44 lg:justify-start lg:-skew-x-12 lg:to-transparent">
          <span className="text-xl font-medium -skew-x-12 lg:skew-x-0 lg:ml-44">
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
                width={120}
                height={120}
                className="opacity-80"
              />
            </motion.div>
          </div>
        ) : (
          <>
            {typeFirstElement === 'withoutTeams' ? (
              <div className="flex flex-col justify-center items-center lg:items-start">
                <span className="font-bebas text-2xl mt-1">
                  {firstElement?.processedData.title}
                </span>

                <div className="px-4 pt-2 flex flex-col justify-center gap-2 text-4xl font-bold tracking-tight mb-3 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:justify-start">
                  {firstElement?.description.includes(
                    'Campeonato Brasileiro',
                  ) && (
                    <Image
                      src={'https://cbs.cbv.com.br/assets/images/logo-cbs.png'}
                      alt=""
                      width={100}
                      height={100}
                      className="invert"
                    />
                  )}

                  {firstElement?.description.includes(
                    'Circuito Brasileiro',
                  ) && <Image src={CBVPColor} alt="" width={80} height={80} />}

                  <div className="flex flex-col">
                    {firstElement?.processedData.court && (
                      <span className="text-medium-yellow/90 text-xl">
                        {firstElement?.processedData.court}
                      </span>
                    )}
                    <div className="flex gap-2 items-center font-medium">
                      {firstElement?.processedData.step && (
                        <>
                          <span>{firstElement?.processedData.step}</span>
                          <span>|</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 mb-6 flex flex-col items-center gap-2 md:px-6 lg:px-0 lg:flex-row">
                  <span className="font-bebas text-xl">
                    {firstElement?.processedData.day}
                  </span>

                  <span className="hidden lg:flex lg:font-bebas lg:text-base">
                    |
                  </span>

                  <div className="flex items-center gap-1">
                    <span className="font-bebas text-xl">
                      {firstElement &&
                        formatInTimeZone(
                          new Date(firstElement?.start_time),
                          'Etc/Universal',
                          'dd/MM/yyyy',
                        )}
                    </span>

                    <span className="font-bebas text-xl">-</span>

                    <span className="font-bebas text-xl">
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
        <div className="px-4 flex justify-center md:px-6 lg:px-0 lg:justify-start">
          <Link
            href=""
            className="uppercase bg-medium-blue text-white text-center italic font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] lg:px-10 lg:text-2xl"
          >
            Quero assistir vôlei o ano todo!
          </Link>
        </div>
      </div>
    </section>
  )
}
