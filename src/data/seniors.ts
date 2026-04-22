import type { Photo } from '../types'

const thumbs = import.meta.glob(
  '../assets/seniors_photoframes/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp}',
  { eager: true, query: '?thumb', import: 'default' },
) as Record<string, string>

const fulls = import.meta.glob(
  '../assets/seniors_photoframes/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp}',
  { eager: true, query: '?full', import: 'default' },
) as Record<string, string>

const rollFromFile = (path: string): string =>
  path
    .split('/')
    .pop()!
    .replace(/\.[^.]+$/, '')
    .replace(/_+$/, '')

export const seniors: Photo[] = Object.entries(thumbs)
  .map(([path, thumb]) => {
    const id = rollFromFile(path)
    return {
      id,
      name: id.toUpperCase(),
      thumb,
      src: fulls[path] ?? thumb,
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id))
