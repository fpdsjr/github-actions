import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <link
          rel="shortcut icon"
          href="https://tvnsports-assets.s3.sa-east-1.amazonaws.com/App/Channel/000/000/001/favicon/small/favicon-nsports.png"
          type="image/x-icon"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@200;300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Canal Vôlei Brasil" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
