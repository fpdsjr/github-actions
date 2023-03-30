import { motion } from 'framer-motion'
import Image from 'next/image'

import ball from '@/assets/bola-de-voleibol.png'

export function MotionBall() {
  return (
    <div className="flex flex-col justify-start h-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={ball}
          alt=""
          width={120}
          height={120}
          className="opacity-80"
        />
      </motion.div>
    </div>
  )
}
