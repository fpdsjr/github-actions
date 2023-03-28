import Image from 'next/image'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

import { useChannel } from '@/hooks/useStates'

import '@splidejs/react-splide/css'

export function Live() {
  const { data: videos } = useChannel(6)

  return (
    <>
      {videos?.upcomming && videos?.upcomming.length > 0 && (
        <section className="relative flex flex-col py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Assista agora no Canal Vôlei Brasil
            </h2>
            <p className="mt-2 mb-16 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Debitis vel officiis commodi liquid
            </p>
          </div>

          <Splide
            hasTrack={false}
            options={{
              perPage: 3,
              gap: '1.5rem',
              padding: 40,
              rewind: true,
              breakpoints: {
                768: {
                  perPage: 1,
                },
                1440: {
                  perPage: 2,
                },
              },
            }}
          >
            <SplideTrack>
              {videos?.upcomming.map((video) => (
                <SplideSlide
                  key={video.id}
                  className="border border-zinc-200 rounded-lg backdrop-blur-lg bg-white/20"
                >
                  <Image
                    src={video.preview_url}
                    alt={video.slug}
                    width={720}
                    height={405}
                    className="rounded-t-lg"
                  />
                  <div className="p-3 flex justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-bold">
                        {video.description.split(':')[0]}
                      </h3>
                      <h3>{video.description.split(':')[1]}</h3>
                    </div>

                    <div className="flex gap-2 items-center relative">
                      <span className="flex h-2.5 w-2.5 absolute -left-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      <span>Ao vivo</span>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        </section>
      )}
    </>
  )
}
