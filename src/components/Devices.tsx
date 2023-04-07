import { UserContext } from '@/contexts/UserContext'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { useVerifyUserIsLogged } from '@/hooks/useStates'

import Apps from '@/assets/devices/apps.png'
import Tv from '@/assets/devices/tv.png'
import Chromecast from '@/assets/devices/chromecast.png'
import Web from '@/assets/devices/web.png'

const devices = [
  {
    id: 1,
    name: 'Apps IOS e Android',
    image: Apps,
  },
  {
    id: 2,
    name: 'Chromecast e Air Play',
    image: Chromecast,
  },
  {
    id: 3,
    name: 'TVs AndroidTV e Samsung (em breve)',
    image: Tv,
  },
  {
    id: 4,
    name: 'Chrome, Edge, Safari e outros',
    image: Web,
  },
]

export function Devices() {
  const {
    handleOpenModal,
    shortToken,
    user,
    setIsSubscribeNow,
    handleWelcomeMessage,
  } = useContext(UserContext)

  const { data: isUserLogged } = useVerifyUserIsLogged()

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

      {user.id ? (
        <Link
          href={
            isUserLogged
              ? '/videos/compre-aqui-superliga-de-volei-2022-2023/?indic=canal_volei_brasil'
              : `/user/token?ct=${shortToken}&redirect=/videos/compre-aqui-superliga-de-volei-2022-2023/?indic=canal_volei_brasil`
          }
          className="py-3 bg-medium-blue font-bold text-lg w-60 rounded mb-10 flex items-center justify-center"
        >
          Assine agora
        </Link>
      ) : (
        <button
          onClick={() => {
            setIsSubscribeNow(true)
            handleWelcomeMessage('assine agora')
            handleOpenModal()
          }}
          className="py-3 bg-medium-blue font-bold text-lg w-60 rounded mb-10"
        >
          Assine agora
        </button>
      )}

      <div className="w-full grid grid-cols-2 gap-2 mx-auto md:grid-cols-4 lg:max-w-4xl lg:gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="grid grid-rows-2 place-items-center gap-1 border-2 border-[rgb(38,75,114)] rounded-lg px-6 py-4 backdrop-blur-xl bg-transparent"
          >
            <Image
              src={device.image}
              alt=""
              width={60}
              height={60}
              className="place-self-center"
            />
            <span className="text-white text-center">{device.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
