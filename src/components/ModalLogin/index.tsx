import { Dialog, Transition } from '@headlessui/react'
import { X } from 'phosphor-react'
import { Fragment } from 'react'
import { CardLogin } from './CardLogin'

interface LoginProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ModalLogin = ({ isOpen, setIsOpen }: LoginProps) => {
  function handleCloseModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all border-4 ">
                  <X
                    size={24}
                    weight="bold"
                    className="absolute p-1 right-2 top-2 text-gray-400 rounded-full cursor-pointer transition-colors hover:text-gray-500 hover:bg-gray-100"
                    onClick={handleCloseModal}
                  />
                  <CardLogin />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
