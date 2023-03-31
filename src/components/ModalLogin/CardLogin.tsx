import Image from 'next/image'
// import { Login } from './Login'
import { Register } from './Register'

export const CardLogin = () => {
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
          Siga o passo a passo para realizar o seu login.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* <Login /> */}
          <Register />
        </div>
      </div>
    </div>
  )
}
