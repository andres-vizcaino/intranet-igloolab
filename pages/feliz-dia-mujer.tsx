import confetti from 'canvas-confetti'
import { useEffect } from 'react'

const confettiSnow = () => {
  const duration = 15 * 1000
  const animationEnd = Date.now() + duration
  let skew = 1

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  ;(function frame() {
    const timeLeft = animationEnd - Date.now()
    const ticks = Math.max(200, 500 * (timeLeft / duration))
    skew = Math.max(0.8, skew - 0.001)

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: [
        '#FF003C',
        '#FAB414',
        '#96D23F',
        '#00B4A0',
        '#00B4E6',
        '#3C1E82',
      ],
      shapes: ['square'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    })

    if (timeLeft > 0) {
      requestAnimationFrame(frame)
    }
  })()
}

const FelizDiaMujer = () => {
  useEffect(() => {
    confettiSnow()
  }, [])

  return (
    <div className="grid place-content-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
        🌷 Feliz día de la Mujer 👸
      </h2>

      <style jsx>{`
        div {
          min-height: 60vh;
        }
      `}</style>
    </div>
  )
}

export default FelizDiaMujer
