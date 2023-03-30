import React from 'react'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import Image from 'next/image'

import '@splidejs/react-splide/css'

import praia1 from '@/assets/banners/praia-1.png'
import praia2 from '@/assets/banners/praia-2-espelhada.png'
import praia3 from '@/assets/banners/praia-3.png'
import praia4 from '@/assets/banners/praia-4.png'
import quadra1 from '@/assets/banners/quadra-1.png'
import quadra3 from '@/assets/banners/quadra-3.png'
import quadra4 from '@/assets/banners/quadra-4.png'

const assets = [
  { id: 1, src: praia1 },
  { id: 2, src: quadra1 },
  { id: 3, src: praia2 },
  { id: 4, src: praia3 },
  { id: 5, src: quadra3 },
  { id: 6, src: praia4 },
  { id: 7, src: quadra4 },
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
