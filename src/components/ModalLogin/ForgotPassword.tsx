import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'phosphor-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { api } from '@/lib'
import { UserContext } from '@/contexts/UserContext'
import { EChannel } from '@/dictionary'
import { Label } from '../Label'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'O email é obrigatório' })
    .email({ message: 'Insira um email válido' }),
})

type Inputs = z.infer<typeof schema>

export function ForgotPassword() {
  const { handleForgotPassword } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const fetchForgotPassword = async (email: string) => {
    const { data } = await api.post(`/users/forgot_password`, null, {
      params: {
        email,
        channel_id: EChannel.VoleiBrasil,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return data
  }

  const mutation = useMutation(fetchForgotPassword)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate(data.email)
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleForgotPassword}
        className="flex items-center gap-1 text-sm text-zinc-700"
      >
        <ArrowLeft size={18} weight="bold" className="text-light-blue" />
        Voltar
      </button>

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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-light-blue py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-light-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {mutation.isLoading ? 'Processando...' : 'Enviar'}
          </button>
        </div>
      </form>

      {(mutation.isSuccess || mutation.isError) && (
        <p className="mt-2 text-center text-sm text-gray-600">
          Enviamos um e-mail para você com as instruções para redefinir sua
          senha.
        </p>
      )}
    </div>
  )
}
