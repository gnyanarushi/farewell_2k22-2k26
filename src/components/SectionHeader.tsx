import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'bright' | 'dark'
}

const toneClasses = {
  bright: {
    eyebrow:
      'border-fuchsia-700/30 bg-white/92 text-fuchsia-800 shadow-[0_8px_24px_-14px_rgba(162,28,175,0.55)] backdrop-blur',
    title: 'text-[#1f1038]',
    desc: 'text-[#3f285d]',
  },
  dark: {
    eyebrow: 'border-white/20 bg-white/5 text-white/80',
    title: 'text-white',
    desc: 'text-white/70',
  },
} as const

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'bright',
}: Props) => {
  const t = toneClasses[tone]
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`mb-10 max-w-2xl ${
        align === 'center' ? 'mx-auto text-center' : ''
      }`}
    >
      {eyebrow && (
        <span
          className={`mb-3 inline-block rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${t.eyebrow}`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-4xl sm:text-5xl ${t.title}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg ${t.desc}`}>{description}</p>
      )}
    </motion.div>
  )
}

export default SectionHeader
