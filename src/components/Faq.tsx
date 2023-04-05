import { Disclosure, Transition } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const FAQ = [
  {
    id: 1,
    question: 'P: Quais partidas eu posso assistir?',
    answer:
      'Tá sentado, voleinauta? Respira fundo... Porque são mais de 1600 jogos no ano, tá 🤩? Todos os jogos do circuito de vôlei de praia, tem a Superliga A, Superliga B, Superliga C,  Campeonato Brasileiro de Seleções e muito mais, além de muito conteúdo exclusivo do mundo do vôlei só para você que é assinante.',
  },
  {
    id: 2,
    question: 'P: Como eu assisto um jogo?',
    answer:
      'Na tela inicial você poderá ver os próximos jogos do Canal Vôlei Brasil. A partida em andamento aparecerá no modo ao vivo no canto superior esquerdo. Basta selecionar e começar a assistir. Os jogos ao vivo na íntegra estarão disponíveis após o encerramento da partida. As partidas são anunciadas da tela inicial do Canal Vôlei Brasil, cerca de 5 dias antes da partida.',
  },
  {
    id: 3,
    question: 'P: E se eu não gostar do Canal Vôlei Brasil?',
    answer:
      'Caso se arrependa de ter adquirido a assinatura do Novo Canal Vôlei Brasil, você pode solicitar o cancelamento em até 7 dias depois da compra. Vá na ',
    answerLinkText: 'Central de Ajuda',
    answerLinkUrl: 'https://tvnsports.zendesk.com/',
    answerContinue:
      ' e clique em "Solicitar Atendimento" no canto superior direito e preencher o formulário de cancelamento de plano ou envie um e-mail para sac@tvnsports.com.br com o motivo de cancelamento, o endereço de e-mail cadastrado e CPF. Não se aplica para jogos avulsos!',
  },
]

export function Faq() {
  return (
    <div className="bg-gradient-to-b from-dark-blue via-dark-blue to-blue-900/40">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 md:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-lnf-medium-yellow">
            FAQ
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {FAQ.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-xl font-semibold leading-7 font-roboto">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-7 w-7"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-7 w-7"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>

                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel
                        as="dd"
                        className="mt-2 pr-12 font-roboto"
                      >
                        <p className="text-lg font-medium leading-7 text-gray-400 py-3">
                          {faq.answer}
                          {faq.answerLinkText && (
                            <>
                              <Link
                                href={faq.answerLinkUrl}
                                className="text-light-blue transition-all hover:underline"
                              >
                                {faq.answerLinkText}
                              </Link>
                              {faq.answerContinue}
                            </>
                          )}
                        </p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
