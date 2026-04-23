import { useEffect, useState } from 'react'
import type { FeedbackItem } from '../types'
import { fetchFeedback, seedFeedback } from '../data/feedback'
import SectionHeader from './SectionHeader'
import { ProgressiveBlur } from './ui/skiper-ui/skiper41'
import { useTheme } from '../hooks/useTheme'

const Feedback = () => {
  const { theme } = useTheme()
  const [items, setItems] = useState<FeedbackItem[]>(seedFeedback)
  const isDark = theme === 'dark'
  const blendColor = theme === 'dark' ? '#0c0717' : '#fff5fb'

  useEffect(() => {
    let alive = true
    fetchFeedback().then((res) => {
      if (alive && res.length > 0) setItems(res)
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <section
      id="feedback"
      className={`relative overflow-hidden ${
        isDark ? 'bg-[#0b0614] text-white' : 'bg-transparent text-[#1f1038]'
      }`}
    >
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

        <div className="mt-10 flex flex-col gap-8 sm:gap-10">
          {items.map((f, i) => (
            <article
              key={`${f.name}-${i}`}
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

              {f.emoji && (
                <div className="mb-4 text-3xl sm:text-4xl">{f.emoji}</div>
              )}
              <div
                className={`whitespace-pre-line text-base leading-relaxed sm:text-lg ${
                  isDark ? 'text-white/90' : 'text-[#3f285d]'
                }`}
              >
                {f.message}
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
                  — {f.name}
                </span>
                {f.role && (
                  <span
                    className={`ml-2 ${
                      isDark ? 'text-white/60' : 'text-[#6a4a8f]'
                    }`}
                  >
                    · {f.role}
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feedback
