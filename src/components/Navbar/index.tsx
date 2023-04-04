import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'

import { classNames } from '@/utils'
import { ModalLogin } from '../ModalLogin'
import { MenuNavDesktop } from './MenuNavDesktop'
import { MenuNavMobile } from './MenuNavMobile'
import { UserContext } from '@/contexts/UserContext'

export function Navbar() {
  const { handleOpenModal } = useContext(UserContext)

  const [scroll, setScroll] = useState(false)

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)

    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [])

  return (
    <>
      <ModalLogin />

      <Disclosure as="nav" className="transition-all">
        {({ open }) => (
          <div
            className={classNames(
              scroll ? 'scroll' : 'bg-gradient-to-b from-black/70',
              'fixed z-50 w-full',
            )}
          >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center w-full justify-between">
                  <div className="flex-shrink-0">
                    <Image
                      src="/canal-volei-brasil.png"
                      alt="Logo Canal Vôlei Brasil"
                      width={150}
                      height={49}
                      placeholder="blur"
                      blurDataURL="/canal-volei-brasil.png"
                      className="block h-8 w-auto"
                    />
                  </div>

                  <MenuNavDesktop />
                </div>

                <MenuNavMobile open={open} />
              </div>
            </div>

            <Disclosure.Panel className="w-full sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <Disclosure.Button
                  as="button"
                  onClick={handleOpenModal}
                  className="block rounded-md w-full px-3 py-2 text-start text-base font-medium text-white transition-colors hover:bg-medium-blue/60"
                >
                  Entrar
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md w-full px-3 py-2 text-start text-base font-medium text-white transition-colors hover:bg-medium-blue/60"
                >
                  Assine agora
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </>
  )
}
