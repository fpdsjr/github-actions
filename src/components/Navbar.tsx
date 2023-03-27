import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { classNames } from '@/utils'

export function Navbar() {
  const [scroll, setScroll] = useState(false)

  const controlNavbar = () => {
    if (window.scrollY > 20) {
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
    <Disclosure as="nav" className="transition-all block h-[4.5rem]">
      {({ open }) => (
        <div
          className={classNames(
            scroll ? 'scroll' : 'bg-dark-blue',
            'w-full fixed z-50',
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
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-white"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium bg-sky-300 text-gray-900 transition-colors hover:bg-medium-blue/60 hover:text-white"
                    >
                      Assine agora
                    </Link>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 transition-colors hover:bg-medium-blue/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-white transition-colors hover:bg-medium-blue/60"
              >
                Entrar
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-white transition-colors hover:bg-medium-blue/60"
              >
                Assine agora
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
