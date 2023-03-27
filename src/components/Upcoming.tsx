import Image from 'next/image'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { format } from 'date-fns'
// import ptBR from 'date-fns/locale/pt-BR'

import { useChannel } from '@/hooks/useStates'

import '@splidejs/react-splide/css'

export function Upcoming() {
  const { data: channel } = useChannel(6)

  return (
    <section className="relative flex flex-col py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Todo mês 1 competição diferente
        </h2>
      </div>
      <p className="mx-auto mt-6 mb-16 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. i dolorem odio
        atque consequuntur illum saepe iste itaque doloribus. Omnis, sit at?
      </p>

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
          {channel?.videos.upcomming.map((video) => (
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

                <div className="flex flex-col items-center">
                  {/* <p className="font-bold">
                    {format(new Date(video.start_time), 'EEEEEE', {
                      locale: ptBR,
                    })}
                  </p> */}
                  <p className="font-bold">
                    {format(new Date(video.start_time), 'dd/MM/yyyy')}
                  </p>
                  <p className="font-bold">
                    {format(new Date(video.start_time), 'HH:mm')}
                  </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}
