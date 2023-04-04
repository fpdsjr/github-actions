import Image from 'next/image'
import { Tab } from '@headlessui/react'
import { useContext } from 'react'

import { UserContext } from '@/contexts/UserContext'
import { classNames } from '@/utils'
import { Login } from './Login'
import { Register } from './Register'
import { ForgotPassword } from './ForgotPassword'

const tabs = [{ name: 'Login' }, { name: 'Cadastro' }]

export const Card = () => {
  const { forgotPassword } = useContext(UserContext)

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto invert-[80%]"
          src="/canal-volei-brasil.png"
          alt=""
          width={150}
          height={49}
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-light-blue">
          Bem-vindo!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Siga o passo a passo para realizar o seu login ou o seu cadastro.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {forgotPassword ? (
          <ForgotPassword />
        ) : (
          <Tab.Group>
            <Tab.List className="flex h-14 px-3 pt-3 space-x-1 shadow rounded-t-lg bg-light-blue">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'w-full h-full font-medium leading-5 focus:outline-none',
                      selected
                        ? 'text-light-blue bg-white rounded-t-lg'
                        : 'text-gray-100 hover:text-gray-200',
                    )
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="bg-white py-8 px-4 shadow sm:rounded-b-lg sm:px-6">
              <Tab.Panel>
                <Login />
              </Tab.Panel>
              <Tab.Panel>
                <Register />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
    </div>
  )
}
