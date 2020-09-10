import makeText from '../core/Text'

function SpeedText({ engine }) {
  let x = 30
  let y = 10

  let text = makeText({
    engine,
    content: 'Speed: ',
    fontStyle: '20px sans-serif',
    x,
    y
  })

  const draw = () => {
    const speed = Math.floor(engine.getPlayer().getState().speed * 100) / 100
    text.update({ content: `Speed: ${speed}` })
    text.render()
  }

  const render = () => {
    draw()
  }

  const scoreText = { render }

  return Object.freeze(scoreText)
}

export default SpeedText
