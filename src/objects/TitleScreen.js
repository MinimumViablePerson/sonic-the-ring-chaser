import BG from '../core/BG'

function StartScreen({ engine }) {
  const bg = BG({ engine, source: '/src/assets/start-screen.jpg' })

  return Object.freeze(bg)
}

export default StartScreen
