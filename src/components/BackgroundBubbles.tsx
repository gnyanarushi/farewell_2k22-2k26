import { useTheme } from '../hooks/useTheme'

const bubbles = [
  {
    size: 'h-44 w-44',
    pos: 'left-[6%] top-[8%]',
    delay: '0s',
    duration: '10s',
    drift: 'bubble-drift-a',
  },
  {
    size: 'h-36 w-36',
    pos: 'right-[8%] top-[16%]',
    delay: '1.2s',
    duration: '12s',
    drift: 'bubble-drift-b',
  },
  {
    size: 'h-52 w-52',
    pos: 'left-[18%] top-[38%]',
    delay: '2.4s',
    duration: '14s',
    drift: 'bubble-drift-c',
  },
  {
    size: 'h-40 w-40',
    pos: 'right-[18%] top-[46%]',
    delay: '0.7s',
    duration: '11s',
    drift: 'bubble-drift-a',
  },
  {
    size: 'h-48 w-48',
    pos: 'left-[10%] bottom-[14%]',
    delay: '1.7s',
    duration: '13s',
    drift: 'bubble-drift-b',
  },
  {
    size: 'h-56 w-56',
    pos: 'right-[10%] bottom-[8%]',
    delay: '2.8s',
    duration: '15s',
    drift: 'bubble-drift-c',
  },
]

const BackgroundBubbles = () => {
  const { theme } = useTheme()
  const bubbleColor =
    theme === 'dark'
      ? 'from-blue-500/20 via-violet-500/18 to-fuchsia-500/16'
      : 'from-blue-400/24 via-violet-400/22 to-fuchsia-400/20'

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className={`absolute ${bubble.pos} ${bubble.size} ${bubble.drift} rounded-full bg-gradient-to-br ${bubbleColor} blur-2xl`}
          style={{
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default BackgroundBubbles
