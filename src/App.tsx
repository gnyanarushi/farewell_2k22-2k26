import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import MemoryVideo from './components/MemoryVideo'
import BackgroundBubbles from './components/BackgroundBubbles'
import './App.css'

const Gallery = lazy(() => import('./components/Gallery'))
const Seniors = lazy(() => import('./components/Seniors'))
const Feedback = lazy(() => import('./components/Feedback'))

const SectionFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-fuchsia-400" />
  </div>
)

const App = () => {
  return (
    <div className="relative">
      <BackgroundBubbles />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Gallery />
          <MemoryVideo />
          <Seniors />
          <Feedback />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
