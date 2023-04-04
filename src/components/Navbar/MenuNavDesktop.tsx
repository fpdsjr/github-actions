import { Fragment, useContext } from 'react'
import Link from 'next/link'
import { SignOut, User } from 'phosphor-react'
import { Menu, Transition } from '@headlessui/react'

import { UserContext } from '@/contexts/UserContext'
import { classNames } from '@/utils'

export function MenuNavDesktop() {
  const { user, handleOpenModal, handleLogout } = useContext(UserContext)

  return (
    <div className="hidden sm:ml-6 sm:block">
      {Object.keys(user).length ? (
        <Menu as="div" className="relative ml-3">
          <Menu.Button className="flex items-center gap-2 font-semibold bg-indigo-300/40 text-dark-blue rounded-full px-3 py-2">
            <div className="rounded-full text-dark-blue bg-white p-1">
              <User size={18} weight="bold" />
            </div>
            <span className="text-white">{user?.name.split(' ')[0]}</span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <span className="w-2 h-2 -top-1 rotate-45 right-3.5 bg-white absolute" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'flex items-center justify-between w-full gap-2 px-4 py-2 text-sm text-gray-700',
                    )}
                  >
                    <SignOut size={18} />
                    Sair
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
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
  )
}
