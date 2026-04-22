import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

export const MusicToggleButton = ({
  src = '/farewell-theme.mp3',
  className = '',
}: {
  src?: string
  className?: string
}) => {
  const bars = 5

  const getRandomHeights = () =>
    Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2)

  const [heights, setHeights] = useState(getRandomHeights())
  const [isPlaying, setIsPlaying] = useState(false)

  const [play, { pause }] = useSound(src, {
    loop: true,
    volume: 0.4,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      setHeights(Array(bars).fill(0.1))
    },
    onpause: () => {
      setIsPlaying(false)
      setHeights(Array(bars).fill(0.1))
    },
    onstop: () => {
      setIsPlaying(false)
      setHeights(Array(bars).fill(0.1))
    },
  })

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => setHeights(getRandomHeights()), 100)
    return () => clearInterval(id)
  }, [isPlaying])

  const handleClick = () => {
    if (isPlaying) {
      pause()
      setIsPlaying(false)
      setHeights(Array(bars).fill(0.1))
      return
    }
    play()
    setIsPlaying(true)
  }

  return (
    <motion.button
      onClick={handleClick}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      aria-pressed={isPlaying}
      key="audio"
      initial={{ padding: '10px 10px' }}
      whileHover={{ padding: '12px 16px' }}
      whileTap={{ padding: '12px 16px' }}
      transition={{ duration: 1, bounce: 0.6, type: 'spring' }}
      className={`cursor-pointer rounded-full ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={{ type: 'spring', bounce: 0.35 }}
        className="flex h-[18px] items-center gap-1 rounded-full"
      >
        {heights.map((height, i) => (
          <motion.div
            key={i}
            className="w-[1.5px] rounded-full bg-current"
            initial={{ height: 1 }}
            animate={{ height: Math.max(4, height * 14) }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          />
        ))}
      </motion.div>
    </motion.button>
  )
}

/**
 * Skiper 25 Micro Interactions_005 — adapted for Vite.
 * Source: https://skiper-ui.com (free with attribution).
 */
