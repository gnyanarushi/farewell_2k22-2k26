# Farewell 2K26 Website

A modern, animated farewell website built for the IT batch using React, TypeScript, Vite, Tailwind CSS, GSAP, and curated UI components inspired by Skiper UI.

## Features

- Smooth single-page flow with anchored sections (`Home`, `Gallery`, `Video`, `Seniors`, `Feedback`)
- Light and dark mode with a theme toggle
- Animated purple/blue background bubbles across all sections
- Student gallery with search + lightbox preview
- Seniors frame section with animated cards and tap-to-view
- Memory video plays while the pointer is over the whole video section (pauses when it leaves)
- Feedback section lists every message in full, driven by `src/data/feedback.ts`
- Mobile-friendly responsive UI

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- GSAP (scroll and motion effects)
- Framer Motion (UI transitions)
- Lenis / Howler / Lucide React

## Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Run development server

```bash
pnpm dev
```

### 3) Build for production

```bash
pnpm build
```

### 4) Preview production build

```bash
pnpm preview
```

### 5) Run lint checks

```bash
pnpm lint
```

## Project Structure

- `src/App.tsx` - Main page composition and section order
- `src/components/` - Reusable UI and section components
- `src/data/students.ts` - Student gallery data
- `src/data/seniors.ts` - Seniors frame data
- `src/data/feedback.ts` - Feedback messages (JSON object array)
- `src/assets/` - Local media assets

## Content Customization

### Update feedback messages

Edit `src/data/feedback.ts` and add objects to `seedFeedback`:

```ts
{
  name: 'Your Name',
  role: 'Batch 2K22 — 2K26',
  emoji: '✨',
  message: `Your message...`,
}
```

### Update memory video

Default playback uses YouTube (`DEFAULT_MEMORY_VIDEO_URL` in `src/components/MemoryVideo.tsx`). To change it without editing code, set `VITE_MEMORY_VIDEO_EMBED_URL` (YouTube watch/embed or any iframe URL) or `VITE_MEMORY_VIDEO_FILE` (direct `.mp4` URL). Autoplay may be muted until the viewer interacts, depending on the browser.

### Update students/seniors photos

- Student gallery data: `src/data/students.ts`
- Seniors data: `src/data/seniors.ts`

## Notes

- The video section plays while the cursor is anywhere in that section (including the heading) and stops when it leaves.
- Theme and animation styling are centralized in `src/index.css`.
- Navbar links are anchor-based for smooth in-page navigation.

## License

This project is for farewell/event usage. Add your preferred license if distributing publicly.
