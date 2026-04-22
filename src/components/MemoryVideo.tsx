import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useTheme } from '../hooks/useTheme'

const DRIVE_VIDEO_ID = '1aaSOF9U3o726wtx2bh3yPoKTjt2NAWqY'
const DRIVE_PREVIEW_URL = `https://drive.google.com/file/d/${DRIVE_VIDEO_ID}/preview`
const DRIVE_PRELOAD_URL = `${DRIVE_PREVIEW_URL}?mute=1`
const DRIVE_PLAY_URL = `${DRIVE_PREVIEW_URL}?autoplay=1&mute=1#t=3`
const DRIVE_RESUME_URL = `${DRIVE_PREVIEW_URL}?autoplay=1&mute=1`

const MemoryVideo = () => {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement | null>(null)
  const [playerSrc, setPlayerSrc] = useState(DRIVE_PRELOAD_URL)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const target = sectionRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35
        if (visible) {
          if (!hasStartedRef.current) {
            hasStartedRef.current = true
            setPlayerSrc(DRIVE_PLAY_URL)
          } else {
            setPlayerSrc(DRIVE_RESUME_URL)
          }
        } else {
          // Unmount the player when section leaves viewport to stop playback.
          setPlayerSrc('about:blank')
        }
      },
      { threshold: [0, 0.35, 0.6, 1] },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="memory-video"
      className="relative px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tone={theme === 'dark' ? 'dark' : 'bright'}
          eyebrow="Farewell Highlight"
          title={
            <>
              A Moment to <span className="gradient-text">Relive</span>
            </>
          }
         
        />

        <div className="glass-strong mx-auto max-w-5xl rounded-[2rem] p-3 sm:p-4">
          <div className="relative overflow-hidden rounded-[1.4rem] ring-1 ring-fuchsia-700/20">
            <div className="aspect-video w-full bg-black">
              <iframe
                src={playerSrc}
                title="Farewell Memory Video"
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="eager"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemoryVideo
