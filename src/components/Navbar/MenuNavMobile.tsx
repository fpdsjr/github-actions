import { Fragment, useContext } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SignOut, User } from 'phosphor-react'

import { UserContext } from '@/contexts/UserContext'
import { classNames } from '@/utils'

interface MenuNavMobileProps {
  open: boolean
}

export function MenuNavMobile({ open }: MenuNavMobileProps) {
  const { user, handleLogout } = useContext(UserContext)

  return (
    <>
      <div className="-mr-2 flex sm:hidden">
        {Object.keys(user).length ? (
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <div className="rounded-full text-white bg-indigo-300/40 p-1.5">
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
                        'block p-4 text-sm font-bold text-gray-700',
                      )}
                    >
                      {user.name.split(' ')[0]}
                    </span>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700',
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
          <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 transition-colors hover:bg-medium-blue/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </Disclosure.Button>
        )}
      </div>
    </>
  )
}
