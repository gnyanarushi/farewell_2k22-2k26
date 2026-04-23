/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** YouTube watch/short/share link or any iframe `src` (Vimeo, Drive preview, etc.). Large files: use unlisted YouTube. */
  readonly VITE_MEMORY_VIDEO_EMBED_URL?: string
  /** Direct .mp4 / .webm URL (e.g. R2/S3), not committed to git. */
  readonly VITE_MEMORY_VIDEO_FILE?: string
}

declare module '*?thumb' {
  const src: string
  export default src
}

declare module '*?full' {
  const src: string
  export default src
}
