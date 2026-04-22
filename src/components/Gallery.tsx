import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { students } from '../data/students'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useTheme } from '../hooks/useTheme'

const Gallery = () => {
  const { theme } = useTheme()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return students
    return students.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        (p.name ?? '').toLowerCase().includes(q),
    )
  }, [query])

  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tone={theme === 'dark' ? 'dark' : 'bright'}
          eyebrow="Students Gallery"
          title={
            <>
              Faces of a <span className="gradient-text">Beautiful Year</span>
            </>
          }
          description="Every smile here carries a story. Hover, tap, and relive them."
        />

        <div className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="text-sm font-medium text-[#3a2459] dark:text-violet-200/90">
            {filtered.length} {filtered.length === 1 ? 'memory' : 'memories'}
          </div>
          <label className="glass flex w-full max-w-sm items-center gap-2 rounded-full px-4 py-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-[#3a2459] dark:text-violet-200/90"
            >
              <path
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              placeholder="Search by roll number…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#241438] placeholder:text-[#705090] focus:outline-none dark:text-violet-100 dark:placeholder:text-violet-300/60"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setActive(students.indexOf(p))}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 10) * 0.03 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/80 bg-white/60 text-left shadow-[0_10px_30px_-15px_rgba(120,60,180,0.35)] transition-shadow hover:shadow-[0_18px_45px_-15px_rgba(217,70,239,0.45)] dark:border-white/15 dark:bg-white/5"
            >
              <img
                src={p.thumb}
                alt={p.name ?? p.id}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent opacity-78 transition group-hover:opacity-95" />
              {p.name && (
                <div className="absolute inset-x-0 bottom-0 translate-y-1 p-3 text-left opacity-90 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="truncate font-mono text-xs tracking-wider text-white">
                    {p.name}
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass mx-auto mt-8 max-w-md rounded-3xl p-6 text-center text-sm font-medium text-[#3f285d] dark:text-violet-200">
            No matches for “{query}”.
          </div>
        )}
      </div>

      <Lightbox
        photos={students}
        index={active}
        onClose={() => setActive(null)}
        onIndexChange={setActive}
      />
    </section>
  )
}

export default Gallery
