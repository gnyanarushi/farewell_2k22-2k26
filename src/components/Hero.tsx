import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from '../assets/farewell_2k26.png?full'

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const heroCardRef = useRef<HTMLDivElement | null>(null)
  const leftGlowRef = useRef<HTMLDivElement | null>(null)
  const rightGlowRef = useRef<HTMLDivElement | null>(null)
  const cueRef = useRef<HTMLAnchorElement | null>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroCardRef.current,
        { y: 36, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        },
      )

      gsap.to(cueRef.current, {
        y: 8,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(leftGlowRef.current, {
        yPercent: -16,
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(rightGlowRef.current, {
        yPercent: -8,
        xPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-4 pb-16 pt-24 sm:px-6 sm:pt-28"
    >
      {/* Soft backdrop glows */}
      <div
        ref={leftGlowRef}
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl dark:bg-fuchsia-600/30"
      />
      <div
        ref={rightGlowRef}
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-violet-300/40 blur-3xl dark:bg-violet-600/30"
      />

      <div
        ref={heroCardRef}
        className="relative w-full max-w-[104rem]"
      >
        {/* Outer frame */}
        <div className="relative rounded-[2rem] border border-white/80 bg-gradient-to-br from-white to-fuchsia-50 p-3 shadow-[0_30px_80px_-20px_rgba(120,60,180,0.45)] dark:border-white/20 dark:from-[#1a1031] dark:to-[#0f0b1f] sm:p-4">
          {/* Inner bevel */}
          <div className="relative overflow-hidden rounded-[1.4rem] ring-1 ring-fuchsia-500/10 dark:ring-violet-300/20">
            <img
              src={heroImg}
              alt="Farewell 2K26 — Information Technology"
              fetchPriority="high"
              className="block h-auto w-full object-contain"
            />
            {/* Decorative frame corners */}
            <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-white/80" />
            <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-white/80" />
            <span className="pointer-events-none absolute left-3 bottom-3 h-6 w-6 border-l-2 border-b-2 border-white/80" />
            <span className="pointer-events-none absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2 border-white/80" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        ref={cueRef}
        href="#gallery"
        aria-label="Scroll to gallery"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/95 bg-white/88 px-4 py-2 text-[#45216f] shadow-[0_10px_24px_-16px_rgba(76,29,149,0.55)] backdrop-blur transition hover:text-[#2f114f] dark:border-white/20 dark:bg-[#140d25]/80 dark:text-violet-300 dark:hover:text-violet-100"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>
    </section>
  )
}

export default Hero
