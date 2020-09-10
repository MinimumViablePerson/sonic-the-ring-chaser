import Text from '../core/Text'

function ScoreText({ engine }) {
  let x = engine.canvas.element.width - 100
  let y = 10

  let text = Text({
    engine,
    content: 'Score: ',
    fontStyle: '20px sans-serif',
    x,
    y
  })

  const draw = () => {
    text.update({
      content: `Score: ${engine.getState().score}`
    })
    text.render()
  }

  const render = () => {
    draw()
  }

  const scoreText = { render }

  return Object.freeze(scoreText)
}

export default ScoreText
