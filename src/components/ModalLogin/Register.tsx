import { useState } from 'react'
// import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash } from 'phosphor-react'

import { Label } from '../Label'
import { BirthDate } from './BirthDate'

const schema = z
  .object({
    fullName: z.string().min(3, { message: 'O nome é obrigatório' }),
    birthDate: z
      .date({
        errorMap: () => ({ message: 'A data de nascimento é obrigatória' }),
      })
      .max(new Date(), { message: 'Data inválida' }),
    gender: z.enum(['feminino', 'masculino'], {
      errorMap: () => ({ message: 'Esse campo é obrigatório' }),
    }),
    email: z
      .string()
      .min(1, { message: 'O email é obrigatório' })
      .email({ message: 'Insira um email válido' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
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

// const currentDomain = 'http://localhost:3000'

const genders = [
  { id: 'feminino', title: 'Feminino' },
  { id: 'masculino', title: 'Masculino' },
]

export function Register() {
  // const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    // router.push(
    //   `https://www.nsports.com.br/user/login?current_domain=${currentDomain}`,
    // )
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label text="Nome completo" htmlFor="fullName" />
          <div className="mt-2">
            <input
              id="fullName"
              type="text"
              placeholder="Digite seu nome completo"
              {...register('fullName')}
              className="block w-full outline-none rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-light-blue sm:text-sm sm:leading-6"
            />
          </div>
          {errors.fullName && (
            <span className="text-red-600 text-xs">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <BirthDate errors={errors} control={control} />

        <div>
          <Label text="Sexo" htmlFor="gender" />

          <fieldset className="mt-2">
            <legend className="sr-only">Sexo</legend>
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
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
            {errors.gender && (
              <span className="text-red-600 text-xs">
                {errors.gender.message}
              </span>
            )}
          </fieldset>
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
          {errors.password && (
            <span className="text-red-600 text-xs">
              {errors.password.message}
            </span>
          )}
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
                  className="ml-2 block text-sm text-gray-900"
                >
                  Concordo com a política de privacidade
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
