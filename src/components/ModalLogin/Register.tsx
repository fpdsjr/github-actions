import { useContext, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Link from 'next/link'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowSquareOut, Eye, EyeSlash } from 'phosphor-react'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { UserContext } from '@/contexts/UserContext'
import { api } from '@/lib'
import { classNames } from '@/utils'
import { ILoginData } from '@/interfaces'
import { BirthDate } from './BirthDate'
import { Label } from '../Label'

const schema = z
  .object({
    name: z.string().min(3, { message: 'O nome é obrigatório' }),
    birth_date: z
      .date({
        errorMap: () => ({ message: 'A data de nascimento é obrigatória' }),
      })
      .max(new Date(), { message: 'Data inválida' }),
    gender: z.enum(['female', 'male'], {
      errorMap: () => ({ message: 'Esse campo é obrigatório' }),
    }),
    email: z
      .string()
      .min(1, { message: 'O email é obrigatório' })
      .email({ message: 'Insira um email válido' }),
    password: z
      .string()
      .min(6)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/[0-9]/)
      .regex(/.*[\W_]+.*/),
    confirmPassword: z
      .string()
      .min(1, { message: 'Você deve confirmar a sua senha' }),
    agreeTerms: z
      .boolean({
        errorMap: () => ({ message: 'Você deve aceitar os termos de uso' }),
      })
      .refine((value) => value, {
        message: 'Você deve aceitar os termos de uso',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem',
  })

type Inputs = z.infer<typeof schema>

const genders = [
  { id: 'female', title: 'Feminino' },
  { id: 'male', title: 'Masculino' },
]

export function Register() {
  const router = useRouter()
  const { handleUserToken, handleCloseModal, isSubscribeNow } =
    useContext(UserContext)

  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const password = watch('password')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const fetchSignUp = async (body: { user: ILoginData }) => {
    const { data } = await api.post(`/users`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return data
  }

  const mutation = useMutation(fetchSignUp, {
    onSuccess: (data) => {
      Cookies.set('tvnsports_session', data.ticket)
      handleUserToken(data.ticket)
      isSubscribeNow &&
        router.push(
          'https://canalvoleibrasil.cbv.com.br/videos/compre-aqui-superliga-de-volei-2022-2023/?indic=canal_volei_brasil',
        )
    },
    onError: (e: any) => {
      setMessage(e.response.data.message[0])
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
      channels: ['home', 'homemm'],
      gender: data.gender,
      birth_date: data.birth_date,
    }

    mutation.mutate({ user: newData })
  }

  return (
    <>
      {mutation.isSuccess && handleCloseModal()}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label text="Nome completo" htmlFor="name" />
          <div className="mt-2">
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              {...register('name')}
              className="block w-full outline-none rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-light-blue sm:text-sm sm:leading-6"
            />
          </div>
          {errors.name && (
            <span className="text-red-600 text-xs">{errors.name.message}</span>
          )}
        </div>

        <div>
          <Label text="E-mail" htmlFor="email" />

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

        <BirthDate errors={errors} control={control} />

        <div>
          <div className="flex justify-between items-center">
            <Label text="Sexo" htmlFor="gender" />

            <fieldset>
              <legend className="sr-only">Sexo</legend>
              <div className="flex items-center space-x-10 space-y-0">
                {genders.map((gender) => (
                  <div key={gender.id} className="flex items-center">
                    <input
                      id={gender.id}
                      type="radio"
                      value={gender.id}
                      {...register('gender')}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor={gender.id}
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      {gender.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          {errors.gender && (
            <span className="text-red-600 text-xs">
              {errors.gender.message}
            </span>
          )}
        </div>

        <div>
          <Label text="Senha" htmlFor="password" />

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

          <div className="text-gray-400 text-xs pt-2 flex flex-col">
            <ul className="font-medium mb-1">A senha deve ter pelo menos:</ul>
            <li
              className={classNames(
                password?.length >= 6 ? 'text-green-600' : '',
                'font-medium',
              )}
            >
              6 caracteres
            </li>
            <li
              className={classNames(
                password?.length >= 1 && /[a-z]/.test(password)
                  ? 'text-green-600'
                  : '',
                'font-medium',
              )}
            >
              uma letra minúscula (a-z)
            </li>
            <li
              className={classNames(
                password?.length >= 1 && /[A-Z]/.test(password)
                  ? 'text-green-600'
                  : '',
                'font-medium',
              )}
            >
              uma letra maiúscula (A-Z)
            </li>
            <li
              className={classNames(
                password?.length >= 1 && /[0-9]/.test(password)
                  ? 'text-green-600'
                  : '',
                'font-medium',
              )}
            >
              um número (0-9)
            </li>
            <li
              className={classNames(
                password?.length >= 1 && /.*[\W_]+.*/.test(password)
                  ? 'text-green-600'
                  : '',
                'font-medium',
              )}
            >
              um caractere especial (!@#%$,etc)
            </li>
          </div>
        </div>

        <div>
          <Label text="Confirmar senha" htmlFor="confirmPassword" />

          <div className="mt-2 border-0 py-1.5 px-2 flex rounded-md ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-inset focus:ring-light-blue">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Repita sua senha"
              {...register('confirmPassword')}
              className="block w-full outline-none  text-gray-900 placeholder:text-gray-400 placeholder:text-sm sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="text-zinc-500"
            >
              {showConfirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-600 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start">
          <Controller
            name="agreeTerms"
            control={control}
            render={({ field }) => (
              <div className="flex items-center mb-2">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 inline-flex items-center gap-1 text-sm text-gray-900"
                >
                  Concordo com a{' '}
                  <Link
                    href="/privacy_policy.pdf"
                    target="_blank"
                    className="text-light-blue inline-flex items-center gap-1 transition-all hover:underline"
                  >
                    política de privacidade
                    <ArrowSquareOut />
                  </Link>
                </label>
              </div>
            )}
          />
          {errors.agreeTerms && (
            <span className="text-red-600 text-xs">
              {errors.agreeTerms.message}
            </span>
          )}
        </div>

        {message === 'Email has already been taken' && (
          <p className="block text-sm text-center text-red-600">
            Usuário já cadastrado! Tente fazer login
          </p>
        )}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-light-blue py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-light-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Registrar
          </button>
        </div>
      </form>
    </>
  )
}
