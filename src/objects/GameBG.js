const { default: BG } = require('../core/BG')

function GameBG({ engine }) {
  const bg = BG({ engine, source: '/src/assets/bg.jpg' })

  return Object.freeze(bg)
}

export default GameBG
