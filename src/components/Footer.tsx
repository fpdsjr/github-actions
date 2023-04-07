import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  TwitterLogo,
} from 'phosphor-react'

const navigation = {
  main: [
    {
      name: 'Agora no CVB',
      href: '/categories/upcoming',
    },
    {
      name: 'Em breve',
      href: '/categories/upcoming',
    },
    {
      name: 'Veja de novo',
      href: '/categories/anteriores-cbv',
    },
    {
      name: 'Melhores momentos',
      href: '/categories/melhores-momentos-cbv',
    },
    {
      name: 'Ajuda',
      href: 'https://tvnsports.zendesk.com/hc/pt-br',
    },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/confederacaobrasileiradevoleibol',
      icon: <FacebookLogo size={24} />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/cbvolei',
      icon: <InstagramLogo size={24} />,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/volei',
      icon: <TwitterLogo size={24} />,
    },
    {
      name: 'Tiktok',
      href: 'https://www.tiktok.com/@cbvolei',
      icon: <TiktokLogo size={24} />,
    },
  ],
}

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden py-10 px-6 lg:py-16 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm uppercase font-bold transition-colors text-light-blue hover:text-sky-200"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="transition-colors font-bold text-light-blue hover:text-sky-200"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-light-blue">
          &copy; 2023 NSports. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
