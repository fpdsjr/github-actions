import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatInTimeZone } from 'date-fns-tz'

import { useChannel } from '@/hooks/useStates'
import { useGetTeams } from '@/hooks/useBuildTeams'
import { teams } from '@/data'

import banner from '@/assets/aberto_m_jogo19_1811-1630.jpg'
import CBVPColor from '@/assets/Logo_Colorido.png'

export function Hero() {
  const { data: videos, isLoading } = useChannel(6)

  const { typeFirstElement, firstElement } = useGetTeams(
    videos?.upcomming,
    teams,
  )

  return (
    <section className="relative h-[90vh] before:absolute before:inset-0 before:z-20 before:bg-gradient-to-r before:from-[rgba(3,14,65,0.96)30%] before:to-[rgba(4,0,61,0)85%] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgb(3,14,65)2%] after:to-[rgba(4,0,61,0)40%]">
      <Image
        src={banner}
        alt=""
        fill
        className="m-auto object-cover object-[50%,30%] absolute"
      />

      <div className="relative flex flex-col justify-center top-0 h-full z-20 lg:pl-[6%]">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.3 }}
          className="px-4 text-center text-5xl uppercase tracking-tight flex flex-col mb-3 md:px-6 md:block lg:px-0 lg:text-start"
        >
          <strong>Novo Canal Vôlei Brasil</strong>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.4 }}
          className="h-10 bg-gradient-to-r from-sky-300 flex items-center justify-center mb-8 lg:mb-3 lg:w-[28rem] lg:-ml-44 lg:justify-start lg:-skew-x-12 lg:to-transparent"
        >
          <span className="text-xl font-medium italic -skew-x-12 lg:skew-x-0 lg:ml-44">
            Assista ao vivo
          </span>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="loader" />
          </div>
        ) : (
          <>
            {typeFirstElement === 'volei de praia' ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ y: [100, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                  className="px-4 py-2 flex items-center text-center gap-2 text-4xl font-bold tracking-tight mb-3 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:text-start"
                >
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ y: [100, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.6 }}
                  className="px-4 mb-6 flex items-center gap-2 md:px-6 lg:px-0"
                >
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
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ y: [100, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                  className="px-4 flex items-center text-center text-4xl font-bold tracking-tight mb-1 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:text-start"
                >
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ y: [100, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.6 }}
                  className="px-4 mb-6 flex items-center gap-2 md:px-6 lg:px-0"
                >
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
                </motion.div>
              </>
            )}
          </>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6 }}
          className="px-4 text-center text-[22px] font-light tracking-tight mb-6 md:px-6 lg:px-0 lg:text-start"
        >
          Assista às maiores competições de voleibol do país
        </motion.p>
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
          className="px-4 text-center text-5xl uppercase tracking-tight flex flex-col mb-3 md:px-6 md:block lg:px-0 lg:text-start"
        >
          <strong>Dis beatae</strong>
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8 }}
          className="px-4 text-center uppercase font-medium text-4xl tracking-tight mb-6 md:px-6 lg:px-0 lg:text-start"
        >
          Lorem ipsum dolor sit
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.9 }}
          className="px-4 flex justify-center md:px-6 lg:px-0 lg:justify-start"
        >
          <Link
            href=""
            className="uppercase bg-sky-300 text-zinc-900 italic font-semibold text-lg px-10 py-2 rounded-md transition hover:brightness-125 hover:scale-[1.02]"
          >
            Quero assistir vôlei o ano todo!
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
