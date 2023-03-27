import Image from 'next/image'

// import bg from '@/assets/f8bcceb8-a490-4e01-8495-fcba88eb3dea.jpg'

export function Devices() {
  return (
    <section className="relative flex flex-col items-center py-24">
      {/* <Image src={bg} fill alt="" className="blur-xl opacity-30 -z-10" /> */}

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-400">
          Onde assistir
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          LOREM. IPSUM. LOREM IPSUM
        </p>
      </div>
      <p className="mx-auto mt-6 mb-10 text-center text-2xl leading-8 text-gray-300">
        Disponível em todos os dispositivos: Apple TV, iOS Mobile, Android
        Mobile, Chromecast e Web
      </p>

      <button className="py-3 bg-light-blue font-bold text-lg w-60 rounded">
        Assine agora
      </button>

      <div className="flex justify-between gap-x-14 max-w-2xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="https://static.wixstatic.com/media/315203_8709e523dedc437986de58e5712b2756~mv2.png/v1/fill/w_300,h_288,al_c,q_85,enc_auto/VBtv-Icons_01.png"
            alt=""
            width={300}
            height={288}
            className="invert"
          />
          <span className="text-center">
            Lorem ipsum dolor sit atur laborum sit adipisci id non tenetur.
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="https://static.wixstatic.com/media/315203_c72315e16953492aa69b3cc5ead534f5~mv2.png/v1/fill/w_288,h_288,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/VBtv-Icons_03.png"
            alt=""
            width={288}
            height={288}
            className="invert"
          />
          <span className="text-center">
            Dolor sit atur laborum sit adipisci id non tenetur.
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="https://static.wixstatic.com/media/315203_b12ec0944f874e019d726babecc7db80~mv2.png/v1/fill/w_294,h_294,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/VBtv-Icons_04.png"
            alt=""
            width={294}
            height={294}
            className="invert"
          />
          <span className="text-center">
            Lorem ipsum dolor sit atur laborum sit adipisci id non tenetur.
          </span>
        </div>
      </div>
    </section>
  )
}
