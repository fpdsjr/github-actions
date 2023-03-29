import Image from 'next/image'

import bannerMobile from '@/assets/banner-grid-640X640.jpg'
import bannerDesktop from '@/assets/banner-grid-1920x1080.jpg'

export function Categories() {
  return (
    <div className="flex flex-col mt-24">
      <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 md:px-8 lg:px-10">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Duas modalidades em um só canal
        </h2>
      </div>
      <p className="mx-auto mt-6 pb-16 max-w-xl text-center text-lg leading-8 text-gray-300 px-4 sm:px-6 md:px-8 lg:px-10">
        Fique por dentro de tudo no streaming oficial da Confederação Brasileira
        de Vôlei
      </p>

      <div className="relative h-screen w-full py-24 flex justify-center px-4 sm:px-6 md:px-8 lg:px-10">
        <Image
          src={bannerMobile}
          alt=""
          fill
          className="object-contain sm:hidden"
        />
        <Image
          src={bannerDesktop}
          alt=""
          fill
          className="hidden sm:block sm:object-contain 2xl:object-cover"
        />
      </div>
    </div>
  )
}
