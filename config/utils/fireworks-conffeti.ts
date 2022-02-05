import confetti from 'canvas-confetti'

export const allConfetti = async () => {
    await confetti({
        particleCount: 100,
        spread: 360,
        origin: {
            x: 0.5,
            y: 0.5,
        },
    })
}
