import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MusicToggle from './MusicToggle'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#memory-video', label: 'Video' },
  { href: '#seniors', label: 'Seniors' },
  { href: '#feedback', label: 'Feedback' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className="mx-4 flex items-center justify-between rounded-full border border-white/90 bg-white/92 px-4 py-2 text-[#2a1a3d] shadow-[0_18px_40px_-18px_rgba(76,29,149,0.45)] backdrop-blur-xl transition-all dark:border-white/20 dark:bg-[#140d25]/88 sm:mx-auto sm:max-w-6xl sm:px-6"
      >
        <a
          href="#home"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[#1f1038] dark:text-violet-50"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 text-sm text-white">
            ✦
          </span>
          <span className="hidden sm:inline">Farewell 2K26</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#2a1349] transition hover:bg-fuchsia-500/12 dark:text-violet-100 dark:hover:bg-white/10"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MusicToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2a1349] hover:bg-fuchsia-500/12 dark:text-violet-100 dark:hover:bg-white/10 md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 mt-2 flex flex-col gap-1 rounded-2xl border border-white/90 bg-white/95 p-2 shadow-[0_18px_40px_-20px_rgba(76,29,149,0.5)] backdrop-blur-xl dark:border-white/20 dark:bg-[#140d25]/92 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#2a1349] hover:bg-fuchsia-500/12 dark:text-violet-100 dark:hover:bg-white/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
