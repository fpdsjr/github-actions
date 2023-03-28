import Image from 'next/image'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { formatInTimeZone } from 'date-fns-tz'

import { useChannel } from '@/hooks/useStates'

import '@splidejs/react-splide/css'

export function Upcoming() {
  const { data: videos } = useChannel(6)

  return (
    <section className="relative flex flex-col py-24">
      <Splide
        hasTrack={false}
        options={{
          perPage: 4,
          gap: '1.2rem',
          padding: 40,
          rewind: true,
          breakpoints: {
            768: {
              perPage: 1,
              gap: '0.6rem',
              padding: 20,
            },
            1200: {
              perPage: 2,
            },
            1440: {
              perPage: 3,
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

                <div className="flex flex-col items-center">
                  <p className="font-bold">
                    {formatInTimeZone(
                      new Date(video?.start_time),
                      'Etc/Universal',
                      'dd/MM/yyyy',
                    )}
                  </p>
                  <p className="font-bold">
                    {formatInTimeZone(
                      new Date(video?.start_time),
                      'Etc/Universal',
                      'HH:mm',
                    )}
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
