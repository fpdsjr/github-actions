/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'hbomax-images.warnermediacdn.com',
      'www.gov.si',
      'i.ytimg.com',
      'i.pinimg.com',
      'static.wixstatic.com',
      'tvnsports-assets.s3.sa-east-1.amazonaws.com',
      'cnbl-cdn.bamgrid.com',
      'cdn-placarscoreboard.s3.sa-east-1.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
