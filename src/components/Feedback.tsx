import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FeedbackItem } from '../types'
import { fetchFeedback, seedFeedback } from '../data/feedback'
import SectionHeader from './SectionHeader'
import { ProgressiveBlur } from './ui/skiper-ui/skiper41'
import { useTheme } from '../hooks/useTheme'

const AUTOPLAY_MS = 9000

const Feedback = () => {
  const { theme } = useTheme()
  const [items, setItems] = useState<FeedbackItem[]>(seedFeedback)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    let alive = true
    fetchFeedback().then((res) => {
      if (alive && res.length > 0) setItems(res)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (paused || items.length <= 1) return
    timerRef.current = window.setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    )
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [index, paused, items.length])

  const current = items[index]
  const isDark = theme === 'dark'
  const blendColor = theme === 'dark' ? '#0c0717' : '#fff5fb'
  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + items.length) % items.length)

  return (
    <section
      id="feedback"
      className={`relative overflow-hidden ${
        isDark ? 'bg-[#0b0614] text-white' : 'bg-transparent text-[#1f1038]'
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Feather edges into the cream page */}
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

      {/* Decorative glows */}
      <div
        className={`pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/20' : 'bg-fuchsia-300/35'
        }`}
      />
      <div
        className={`pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-violet-500/20' : 'bg-violet-300/35'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 sm:py-36">
        <SectionHeader
          tone={isDark ? 'dark' : 'bright'}
          eyebrow="Whispers & Wishes"
          title={
            <>
              Words from the <span className="gradient-text">Heart</span>
            </>
          }
          description="Farewell letters — in their own voice."
        />

        <div
          className={`relative rounded-3xl p-8 backdrop-blur-xl sm:p-12 ${
            isDark
              ? 'border border-white/15 bg-white/[0.06] shadow-[0_30px_80px_-20px_rgba(217,70,239,0.35)]'
              : 'border border-fuchsia-700/20 bg-white/82 shadow-[0_30px_80px_-24px_rgba(120,60,180,0.32)]'
          }`}
        >
          <svg
            aria-hidden
            className={`absolute -top-6 left-6 h-16 w-16 sm:-top-8 sm:left-8 sm:h-20 sm:w-20 ${
              isDark ? 'text-fuchsia-400/70' : 'text-fuchsia-700/70'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 7h4v4H7c0 2.2 1.8 4 4 4v2c-3.3 0-6-2.7-6-6V7zm8 0h4v4h-4c0 2.2 1.8 4 4 4v2c-3.3 0-6-2.7-6-6V7z" />
          </svg>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className={isDark ? 'text-white' : 'text-[#281542]'}
              >
                {current?.emoji && (
                  <div className="mb-4 text-3xl sm:text-4xl">
                    {current.emoji}
                  </div>
                )}
                <div
                  className={`whitespace-pre-line text-base leading-relaxed sm:text-lg ${
                    isDark ? 'text-white/90' : 'text-[#3f285d]'
                  }`}
                >
                  {current?.message}
                </div>
                <footer
                  className={`mt-6 border-t pt-4 text-sm ${
                    isDark ? 'border-white/15' : 'border-fuchsia-700/20'
                  }`}
                >
                  <span
                    className={`font-display text-lg ${
                      isDark ? 'text-white' : 'text-[#2a1349]'
                    }`}
                  >
                    — {current?.name}
                  </span>
                  {current?.role && (
                    <span
                      className={`ml-2 ${
                        isDark ? 'text-white/60' : 'text-[#6a4a8f]'
                      }`}
                    >
                      · {current.role}
                    </span>
                  )}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to feedback ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? 'w-8 bg-gradient-to-r from-fuchsia-400 to-violet-400'
                      : isDark
                        ? 'w-2 bg-white/25 hover:bg-white/40'
                        : 'w-2 bg-fuchsia-700/25 hover:bg-fuchsia-700/40'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isDark
                    ? 'border border-white/20 bg-white/5 text-white hover:bg-white/15'
                    : 'border border-fuchsia-700/25 bg-white/75 text-[#2a1349] hover:bg-white'
                }`}
              >
                ‹
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isDark
                    ? 'border border-white/20 bg-white/5 text-white hover:bg-white/15'
                    : 'border border-fuchsia-700/25 bg-white/75 text-[#2a1349] hover:bg-white'
                }`}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Stacked preview */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((f, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-2xl p-5 text-left backdrop-blur-xl transition-all hover:-translate-y-1 ${
                isDark
                  ? 'border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                  : 'border border-fuchsia-700/20 bg-white/78 hover:bg-white'
              } ${i === index ? 'ring-2 ring-fuchsia-400/60' : ''}`}
            >
              <div className="mb-2 text-2xl">{f.emoji}</div>
              <div
                className={`line-clamp-4 text-sm leading-relaxed ${
                  isDark ? 'text-white/80' : 'text-[#4b326c]'
                }`}
              >
                {f.message}
              </div>
              <div
                className={`mt-3 font-display text-base ${
                  isDark ? 'text-white' : 'text-[#2a1349]'
                }`}
              >
                — {f.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feedback
