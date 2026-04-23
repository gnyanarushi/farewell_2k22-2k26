import { useMemo, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useTheme } from '../hooks/useTheme'

/** Default farewell video when `VITE_MEMORY_VIDEO_EMBED_URL` / `VITE_MEMORY_VIDEO_FILE` are unset. */
const DEFAULT_MEMORY_VIDEO_URL = 'https://www.youtube.com/watch?v=5nphtDFx2y0'

/** Clips the top of the YouTube iframe where the title/channel strip usually sits. */
const YT_TOP_CROP_PX = 56

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|ogv)($|[?#])/i.test(url.trim())
}

function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0]
      return id || null
    }
    if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      if (u.pathname.startsWith('/embed/')) {
        return u.pathname.slice('/embed/'.length).split('/')[0] || null
      }
      if (u.pathname.startsWith('/shorts/')) {
        return u.pathname.slice('/shorts/'.length).split('/')[0] || null
      }
      const v = u.searchParams.get('v')
      if (v) return v
    }
  } catch {
    /* ignore */
  }
  return null
}

function isYoutubeEmbedUrl(url: string): boolean {
  return /youtube\.com\/embed\//i.test(url) || /youtube-nocookie\.com\/embed\//i.test(url)
}

/**
 * Playback + presentation: unmuted (`mute=0`), autoplay on load, modest branding.
 * Browsers may still block unmuted autoplay without a click; hover is treated as activation where supported.
 */
function applyYoutubePresentationParams(embedUrl: string): string {
  if (!isYoutubeEmbedUrl(embedUrl)) return embedUrl
  try {
    const u = new URL(embedUrl)
    u.searchParams.set('autoplay', '1')
    u.searchParams.set('mute', '0')
    u.searchParams.set('playsinline', '1')
    u.searchParams.set('modestbranding', '1')
    u.searchParams.set('rel', '0')
    u.searchParams.set('iv_load_policy', '3')
    return u.toString()
  } catch {
    return embedUrl
  }
}

/** Turns a YouTube watch / Short / youtu.be / embed link into a full embed URL; passes other URLs through. */
function resolveEmbedFromEnv(raw: string): string {
  const t = raw.trim()
  const ytId = extractYoutubeId(t)
  if (ytId && !t.includes('/embed/')) {
    return applyYoutubePresentationParams(`https://www.youtube.com/embed/${ytId}`)
  }
  if (isYoutubeEmbedUrl(t)) {
    return applyYoutubePresentationParams(t)
  }
  return t
}

type MemoryMode =
  | { kind: 'native'; src: string }
  | { kind: 'iframe'; embedSrc: string }

function resolveMode(): MemoryMode {
  const embedEnv = (import.meta.env.VITE_MEMORY_VIDEO_EMBED_URL as string | undefined)?.trim()
  if (embedEnv) {
    return { kind: 'iframe', embedSrc: resolveEmbedFromEnv(embedEnv) }
  }

  const fileEnv = (import.meta.env.VITE_MEMORY_VIDEO_FILE as string | undefined)?.trim()
  if (fileEnv && isDirectVideoFile(fileEnv)) {
    return { kind: 'native', src: fileEnv }
  }

  return { kind: 'iframe', embedSrc: resolveEmbedFromEnv(DEFAULT_MEMORY_VIDEO_URL) }
}

const MemoryVideo = () => {
  const { theme } = useTheme()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const mode = useMemo(() => resolveMode(), [])

  const [iframeSrc, setIframeSrc] = useState('about:blank')

  const handlePlayerEnter = () => {
    if (mode.kind === 'iframe') {
      setIframeSrc(mode.embedSrc)
    } else {
      const el = videoRef.current
      if (!el) return
      el.muted = false
      el.volume = 1
      void el.play().catch(() => {})
    }
  }

  const handlePlayerLeave = () => {
    if (mode.kind === 'iframe') {
      setIframeSrc('about:blank')
    } else {
      videoRef.current?.pause()
    }
  }

  const isYoutubeIframe = mode.kind === 'iframe' && isYoutubeEmbedUrl(mode.embedSrc)

  return (
    <section
      id="memory-video"
      className="relative px-6 py-20 sm:py-24"
      onMouseEnter={handlePlayerEnter}
      onMouseLeave={handlePlayerLeave}
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
              {mode.kind === 'native' ? (
                <video
                  ref={videoRef}
                  src={mode.src}
                  className="h-full w-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : isYoutubeIframe ? (
                <div className="relative h-full w-full overflow-hidden">
                  <iframe
                    src={iframeSrc}
                    title="Farewell Memory Video"
                    className="absolute left-0 w-full border-0"
                    style={{
                      top: -YT_TOP_CROP_PX,
                      height: `calc(100% + ${YT_TOP_CROP_PX}px)`,
                    }}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              ) : (
                <iframe
                  src={iframeSrc}
                  title="Farewell Memory Video"
                  className="h-full w-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemoryVideo
