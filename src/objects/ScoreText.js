import Text from '../core/Text'

function ScoreText ({ engine }) {
  let content = `Score: 0`
  const textMeasures = engine.canvas.ctx.measureText(content)
  let x = engine.canvas.element.width - textMeasures.width - 10
  let y = 10

  let text = Text({
    engine,
    content,
    fontStyle: '20px sans-serif',
    x,
    y
  })

  const draw = () => {
    const content = `Score: ${engine.getState().score}`
    const textMeasures = engine.canvas.ctx.measureText(content)
    text.update({
      content,
      x: engine.canvas.element.width - textMeasures.actualBoundingBoxRight - 10
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
