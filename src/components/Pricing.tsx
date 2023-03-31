import { classNames } from '@/utils'
import Link from 'next/link'

const tiers = [
  {
    id: 'monthly',
    name: 'Novo Canal Vôlei Brasil',
    description: 'MENSAL - cancele quando quiser',
    href: '#',
    price: 'R$ 12,90',
    mostPopular: false,
    textButton: 'Assinar mensal',
  },
  {
    id: 'yearly',
    name: 'Novo Canal Vôlei Brasil',
    description: 'ANUAL - em até 12x sem juros',
    tag: 'Economize 4 meses',
    href: '#',
    prefixPrice: '12 x',
    price: 'R$ 7,90',
    priceObs: '* Igual a R$ 94,80/ano',
    mostPopular: true,
    textButton: 'Assinar anual',
  },
  {
    id: 'single',
    name: 'Novo Canal Vôlei Brasil',
    description: 'JOGO AVULSO - somente o jogo selecionado',
    href: '#',
    price: 'R$ 22,90',
    mostPopular: false,
    textButton: 'Comprar 1 jogo',
  },
]

export function Pricing() {
  return (
    <div className="relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-dark-blue to-dark-blue sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            O vôlei brasileiro com você o ano inteiro
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Escolha o tipo de acesso ideal para você
        </p>

        <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-auto lg:max-w-5xl lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'bg-white/5 ring-2 ring-medium-blue' : '',
                'rounded-lg py-8 px-6 flex flex-col justify-between items-center bg-gradient-to-b from-[rgba(255,255,255,0.12)0%] to-[rgba(255,255,255,0)100%]',
              )}
            >
              <div className="flex flex-col items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className="text-2xl text-center font-bold leading-8 text-white"
                >
                  {tier.name}
                </h3>
                <ul className="text-center my-4">
                  <li>{tier.description}</li>
                  <li className="mt-4 font-medium">{tier.tag}</li>
                </ul>
                {tier.mostPopular ? (
                  <p className="rounded-full absolute left-1/2 -translate-x-1/2 -top-4 bg-medium-blue py-1 px-4 uppercase font-bold leading-5 text-white">
                    Mais popular
                  </p>
                ) : null}
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                {/* {tier.prefixPrice && (
                  <span className="text-xs font-medium">
                    {tier.prefixPrice}
                  </span>
                )} */}

                <span className="text-4xl font-extrabold tracking-tight text-white">
                  {tier.price}
                </span>
              </p>
              <span className="mt-4 font-medium">{tier.priceObs}</span>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  'mt-6 block w-full rounded-full py-2 px-3 uppercase text-center font-bold leading-6 bg-gradient-to-r bg-[400%,400%] bg-[99%_50%] from-medium-blue to-medium-blue/60 text-white border-2 border-transparent shadow-sm hover:border-light-blue hover:transition-all hover:duration-500 hover:bg-[1%_50%] hover:from-dark-blue hover:to-light-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                )}
              >
                {tier.textButton}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
