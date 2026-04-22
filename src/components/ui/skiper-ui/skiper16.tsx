import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import ReactLenis from 'lenis/react'
import { useRef, type ReactNode } from 'react'

export type StickyCardItem = {
  title: string
  src: string
  subtitle?: string
}

export const StickyCard_001 = ({
  i,
  title,
  src,
  subtitle,
  progress,
  range,
  targetScale,
}: {
  i: number
  title: string
  src: string
  subtitle?: string
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) => {
  const container = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])
  const phase = i * 0.42
  const orbitRadius = 56 + (i % 6) * 6
  const orbitX = useTransform(
    progress,
    (v) => Math.cos(v * Math.PI * 2 + phase) * orbitRadius * 0.22,
  )
  const orbitY = useTransform(
    progress,
    (v) => Math.sin(v * Math.PI * 2 + phase) * orbitRadius * 0.12,
  )
  const rotate = useTransform(
    progress,
    (v) => Math.sin(v * Math.PI * 2 + phase) * 8,
  )

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          x: orbitX,
          y: orbitY,
          rotate,
          top: `calc(-5vh + ${i * 20 + 120}px)`,
        }}
        className="relative -top-1/4 flex h-[460px] w-[min(92vw,820px)] origin-top flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-white/10 to-black/40 p-3 shadow-[0_40px_100px_-30px_rgba(168,85,247,0.5)] ring-1 ring-white/15"
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <img src={src} alt={title} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <div className="font-mono text-xs tracking-[0.25em] text-white/70">
              {title}
            </div>
            {subtitle && (
              <div className="mt-1 font-display text-xl">{subtitle}</div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

type StickyCardStackProps = {
  items: StickyCardItem[]
  heading?: ReactNode
}

export const StickyCardStack = ({ items, heading }: StickyCardStackProps) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[80vh] pt-[30vh]"
      >
        {heading && (
          <div className="absolute left-1/2 top-[6%] z-10 -translate-x-1/2 text-center">
            {heading}
          </div>
        )}
        {items.map((item, i) => {
          const targetScale = Math.max(0.5, 1 - (items.length - i - 1) * 0.04)
          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              title={item.title}
              src={item.src}
              subtitle={item.subtitle}
              progress={scrollYProgress}
              range={[i * (1 / items.length) * 0.9, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </main>
    </ReactLenis>
  )
}

/**
 * Skiper 16 StickyCard_001 — adapted for this project.
 * Source: https://skiper-ui.com (free with attribution).
 */
