import Image from 'next/image'

export function Categories() {
  return (
    <div className="flex flex-col mt-24">
      <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 md:px-8 lg:px-10">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Duas modalidades em um só canal
        </h2>
      </div>
      <p className="mx-auto mt-6 pb-16 max-w-2xl text-center text-lg leading-8 text-gray-300 px-4 sm:px-6 md:px-8 lg:px-10">
        Fique por dentro de tudo no streaming oficial da Confederação Brasileira
        de Vôlei
      </p>

      <div className="relative h-screen w-full py-24 flex justify-center px-4 sm:px-6 md:px-8 lg:px-10">
        <Image
          src="https://cnbl-cdn.bamgrid.com/assets/650e353fe3d7ed7169d55af7cc5e8b7c0e092ffacc17beca3bf617647702dabe/original"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
