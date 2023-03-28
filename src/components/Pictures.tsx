import React from 'react'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import Image from 'next/image'

import '@splidejs/react-splide/css'

import img1 from '@/assets/aberto_f_final_1911-3697.jpg'
import img2 from '@/assets/aberto_f_final_1911-3820.jpg'
import img3 from '@/assets/top8_m_jogo15_1911-3499.jpg'

const assets = [
  {
    id: 1,
    src: img1,
  },
  {
    id: 2,
    src: img2,
  },
  {
    id: 3,
    src: img3,
  },
]

export const Pictures = () => {
  return (
    <div>
      {/* <h2>Autoplay</h2> */}
      <Splide
        options={{
          type: 'loop',
          autoplay: true,
          gap: '2rem',
          perPage: 2.5,
          focus: 'center',
          rewind: true,
          speed: 1200,
          lazyLoad: 'nearby',
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          breakpoints: {
            768: {
              perPage: 1,
              gap: '1rem',
              padding: 40,
            },
            1200: {
              perPage: 2,
            },
            1440: {
              perPage: 3,
            },
          },
        }}
        hasTrack={false}
        className="splide-pictures"
      >
        <SplideTrack>
          {assets.map((asset) => (
            <SplideSlide key={asset.id}>
              <Image src={asset.src} alt="" width={800} height={500} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  )
}
