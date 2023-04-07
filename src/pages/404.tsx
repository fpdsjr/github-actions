import Image from 'next/image'
import Link from 'next/link'

import { CircleBackground } from '@/components/CircleBackground'

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen mx-auto justify-center items-center px-4">
      <div className="overflow-hidden -z-10 block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <CircleBackground
          color="#28a3ab"
          className="animate-spin-slow w-screen sm:w-[558px] sm:h-[558px]"
        />
      </div>
      <Image src="/canal-volei-brasil.png" alt="" width={150} height={50} />
      <h1 className="text-8xl mb-4 font-black text-transparent bg-clip-text bg-gradient-to-tr from-light-green to-medium-blue sm:text-9xl">
        Oops!
      </h1>
      <p className="font-medium mb-8 text-lg text-center">
        Não conseguimos encontrar essa página.
      </p>
      <Link
        href="/home"
        className="bg-light-blue text-white text-center tracking-wide font-bold text-base px-4 py-2 rounded-3xl transition hover:brightness-125 hover:scale-[1.02] sm:text-xl lg:px-10"
      >
        Ir para página inicial
      </Link>
    </div>
  )
}
