import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Photo } from '../types'

type Props = {
  photos: Photo[]
  index: number | null
  onClose: () => void
  onIndexChange: (i: number) => void
}

const Lightbox = ({ photos, index, onClose, onIndexChange }: Props) => {
  const photo = index !== null ? photos[index] : null

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndexChange((index + 1) % photos.length)
      if (e.key === 'ArrowLeft')
        onIndexChange((index - 1 + photos.length) % photos.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, photos.length, onClose, onIndexChange])

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a0c2e]/85 p-4 backdrop-blur-md"
        >
          <motion.figure
            key={photo.id}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-5xl flex-col items-center"
          >
            <img
              src={photo.src}
              alt={photo.name ?? 'Memory'}
              className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
              loading="eager"
            />
            {(photo.name || photo.caption) && (
              <figcaption className="mt-4 text-center text-white/85">
                {photo.name && (
                  <div className="font-display text-lg">{photo.name}</div>
                )}
                {photo.caption && (
                  <div className="text-sm text-white/65">{photo.caption}</div>
                )}
              </figcaption>
            )}

            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2a1a3d] shadow transition hover:scale-105"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <a
              href={photo.src}
              download={`${photo.id}.jpg`}
              className="absolute -bottom-[4.5rem] left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download image
            </a>
          </motion.figure>

          {photos.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation()
                  onIndexChange((index - 1 + photos.length) % photos.length)
                }}
                className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 sm:flex"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation()
                  onIndexChange((index + 1) % photos.length)
                }}
                className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 sm:flex"
              >
                ›
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
