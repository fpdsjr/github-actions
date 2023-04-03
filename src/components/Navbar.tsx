import { Fragment, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { SignOut, User } from 'phosphor-react'

import { classNames } from '@/utils'
import { UserContext } from '@/contexts/UserContext'
import { ModalLogin } from './ModalLogin'

export function Navbar() {
  const { user, handleOpenModal } = useContext(UserContext)

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
              scroll ? 'scroll' : 'bg-gradient-to-b from-black/60',
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

                  <div className="hidden sm:ml-6 sm:block">
                    {Object.keys(user).length ? (
                      <div className="flex items-center gap-2 font-semibold bg-indigo-300/40 text-dark-blue rounded-full px-3 py-2">
                        <div className="rounded-full text-dark-blue bg-white p-1">
                          <User size={18} weight="bold" />
                        </div>
                        <span className="text-white">
                          {user?.name.split(' ')[0]}
                        </span>
                      </div>
                    ) : (
                      <div className="flex space-x-4">
                        <button
                          onClick={handleOpenModal}
                          className="rounded-md px-3 py-2 text-sm font-medium text-white"
                        >
                          Entrar
                        </button>
                        <Link
                          href="#"
                          className="rounded-md px-3 py-2 text-sm font-medium bg-medium-blue text-white transition-colors hover:bg-medium-blue/60 hover:text-white"
                        >
                          Assine agora
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="-mr-2 flex sm:hidden">
                  {Object.keys(user).length ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <div className="rounded-full bg-medium-blue/50 text-white p-1.5">
                            <User size={24} weight="bold" />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <span className="w-2 h-2 -top-1 rotate-45 right-3.5 bg-white absolute" />
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block p-4 text-sm font-bold text-gray-700',
                                )}
                              >
                                {user.name.split(' ')[0]}
                              </span>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex items-center gap-2 px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                <SignOut size={18} />
                                Sair
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 transition-colors hover:bg-medium-blue/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <Disclosure.Button
                  as="button"
                  onClick={handleOpenModal}
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
    </>
  )
}
