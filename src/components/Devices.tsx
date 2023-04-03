import Image from 'next/image'

const devices = [
  {
    id: 1,
    name: 'Apple TV',
    image:
      'https://static.wixstatic.com/media/315203_8709e523dedc437986de58e5712b2756~mv2.png/v1/fill/w_300,h_288,al_c,q_85,enc_auto/VBtv-Icons_01.png',
  },
  {
    id: 2,
    name: 'Chromecast',
    image:
      'https://static.wixstatic.com/media/315203_b12ec0944f874e019d726babecc7db80~mv2.png/v1/fill/w_294,h_294,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/VBtv-Icons_04.png',
  },
  {
    id: 3,
    name: 'Web',
    image:
      'https://static.wixstatic.com/media/315203_8709e523dedc437986de58e5712b2756~mv2.png/v1/fill/w_300,h_288,al_c,q_85,enc_auto/VBtv-Icons_01.png',
  },
  {
    id: 4,
    name: 'iOS Mobile',
    image:
      'https://static.wixstatic.com/media/315203_c72315e16953492aa69b3cc5ead534f5~mv2.png/v1/fill/w_288,h_288,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/VBtv-Icons_03.png',
  },
  {
    id: 5,
    name: 'Android Mobile',
    image:
      'https://static.wixstatic.com/media/315203_8709e523dedc437986de58e5712b2756~mv2.png/v1/fill/w_300,h_288,al_c,q_85,enc_auto/VBtv-Icons_01.png',
  },
]

export function Devices() {
  return (
    <section className="relative flex flex-col items-center py-24 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Assista como e de onde quiser!
        </h2>
      </div>
      <p className="mx-auto mt-6 mb-10 text-center text-2xl leading-8 text-gray-300 max-w-[60ch]">
        Espelhe para a tela grande da TV ou assista no tablet, laptop, celular e
        outros aparelhos. Transmissões em Full HD.
      </p>

      <button className="py-3 bg-medium-blue font-bold text-lg w-60 rounded mb-10">
        Assine agora
      </button>

      <div className="w-full flex-1 flex flex-wrap justify-center gap-2 mx-auto sm:flex-row lg:max-w-6xl lg:gap-4 lg:grid lg:grid-cols-5">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex flex-col justify-center items-center border-2 border-[rgb(38,75,114)] rounded-lg px-6 py-4 backdrop-blur-xl bg-transparent"
          >
            <span className="text-white text-center">{device.name}</span>
            <Image
              src={device.image}
              alt=""
              width={100}
              height={100}
              className="invert"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
