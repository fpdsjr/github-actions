import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash, FacebookLogo, GoogleLogo } from 'phosphor-react'

import { Label } from '../Label'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'O email é obrigatório' })
    .email({ message: 'Insira um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

type Inputs = z.infer<typeof schema>

const currentDomain = 'http://localhost:3000'

export function Login() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(
      `https://www.nsports.com.br/user/login?current_domain=${currentDomain}`,
    )
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email" text="E-mail" />

          <div className="mt-2">
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
              {...register('email')}
              className="block w-full outline-none rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-light-blue sm:text-sm sm:leading-6"
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor="password" text="Senha" />

          <div className="mt-2 border-0 py-1.5 px-2 flex rounded-md ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-inset focus:ring-light-blue">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Digite sua senha"
              {...register('password')}
              className="block w-full outline-none  text-gray-900 placeholder:text-gray-400 placeholder:text-sm sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-zinc-500"
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-600 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Lembrar-me
            </label>
          </div>

          <div className="text-sm">
            <Link
              href="#"
              className="font-medium text-light-blue hover:text-light-blue/80"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-light-blue py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-light-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Entrar
          </button>
        </div>
      </form>

      {/* Providers */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Ou entre com</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <Link
              href={`https://www.nsports.com.br/facebook/login?current_domain=${currentDomain}`}
              className="inline-flex w-full gap-2 justify-center items-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
            >
              <span className="sr-only">Entre com o Facebook</span>
              <FacebookLogo weight="fill" size={24} />
              <span className="font-medium text-sm">Facebook</span>
            </Link>
          </div>

          <div>
            <Link
              href={`https://www.nsports.com.br/google/login?current_domain=${currentDomain}`}
              className="inline-flex w-full gap-2 justify-center items-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
            >
              <span className="sr-only">Entre com o Google</span>
              <GoogleLogo weight="fill" size={24} />
              <span className="font-medium text-sm">Google</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
