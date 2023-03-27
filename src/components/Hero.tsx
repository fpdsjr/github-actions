import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import banner from '@/assets/aberto_m_jogo19_1811-1630.jpg'

export function Hero() {
  return (
    <section className="relative h-[90vh] before:content-[''] before:absolute before:inset-0 before:z-20 before:bg-gradient-to-r before:from-[rgba(3,14,65,0.9)30%] before:to-[rgba(4,0,61,0)85%] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgb(3,14,65)2%] after:to-[rgba(4,0,61,0)40%]">
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
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="px-4 text-center text-4xl font-bold tracking-tight mb-1 max-w-[15ch] md:px-6 md:max-w-none lg:px-0 lg:text-start"
        >
          Est tempore eaque veritatis!
        </motion.h3>
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
