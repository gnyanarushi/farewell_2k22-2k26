import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { seniors } from '../data/seniors'
import { ProgressiveBlur } from './ui/skiper-ui/skiper41'
import Lightbox from './Lightbox'
import { useTheme } from '../hooks/useTheme'

const Seniors = () => {
  const [active, setActive] = useState<number | null>(null)
  const { theme } = useTheme()
  const blendColor = theme === 'dark' ? '#0c0717' : '#fff5fb'
  const sectionRef = useRef<HTMLElement | null>(null)
  const frameRefs = useRef<Array<HTMLButtonElement | null>>([])
  const isDark = theme === 'dark'

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const movementPatterns = [
      { x: -16, y: -42, rotate: -2.8 },
      { x: 18, y: -36, rotate: 2.4 },
      { x: -20, y: 34, rotate: -2.2 },
      { x: 14, y: 44, rotate: 2.7 },
    ]

    const ctx = gsap.context(() => {
      frameRefs.current.forEach((frame, i) => {
        if (!frame) return
        const pattern = movementPatterns[i % movementPatterns.length]
        const drift = i % 2 === 0 ? 5 : -5

        gsap.to(frame, {
          y: `+=${drift}`,
          duration: 2.6 + (i % 4) * 0.35,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        gsap.to(frame, {
          x: pattern.x,
          y: pattern.y,
          rotate: pattern.rotate,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: 0.7,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="seniors"
      className={`relative overflow-hidden ${
        isDark ? 'bg-[#0b0614] text-white' : 'bg-transparent text-[#1f1038]'
      }`}
    >
      {/* smooth transition in/out of the dark band */}
      <ProgressiveBlur
        position="top"
        backgroundColor={blendColor}
        height="120px"
      />
      <ProgressiveBlur
        position="bottom"
        backgroundColor={blendColor}
        height="120px"
      />

      {/* decorative glows */}
      <div
        className={`pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/25' : 'bg-fuchsia-300/35'
        }`}
      />
      <div
        className={`pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full blur-3xl ${
          isDark ? 'bg-violet-500/25' : 'bg-violet-300/35'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-36">
        <h3
          className={`mb-6 text-center font-display text-2xl ${
            isDark ? 'text-white/90' : 'text-[#2a1349]'
          }`}
        >
          Tap any frame to view full size
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {seniors.map((p, i) => (
            <motion.button
              key={p.id}
              ref={(el) => {
                frameRefs.current[i] = el
              }}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 10) * 0.02 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl transition-all ${
                isDark
                  ? 'bg-white/5 ring-1 ring-white/10 hover:ring-white/30'
                  : 'bg-white/78 ring-1 ring-fuchsia-700/15 shadow-[0_12px_30px_-18px_rgba(91,33,182,0.35)] hover:ring-fuchsia-700/30'
              }`}
            >
              <div className="aspect-[3/2]">
                <img
                  src={p.thumb}
                  alt={p.name ?? p.id}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <div className="font-mono text-[10px] tracking-wider text-white/90">
                  {p.id.toUpperCase()}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        photos={seniors}
        index={active}
        onClose={() => setActive(null)}
        onIndexChange={setActive}
      />
    </section>
  )
}

export default Seniors
