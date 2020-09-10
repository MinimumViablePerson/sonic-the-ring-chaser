import Text from '../core/Text'

function StartingText({ engine }) {
  let canvas = engine.canvas

  let text = Text({
    engine,
    content: 'Ready?',
    fontStyle: '50px lobster',
    color: 'white',
    y: canvas.element.height / 2.5,
    centered: true
  })

  setTimeout(() => {
    text.update({ content: 'GO!' })
    setTimeout(() => {
      engine.removeObject(startingText)
    }, 1000)
  }, 2000)

  const draw = () => {
    text.render()
  }

  const render = () => {
    draw()
  }

  const startingText = { render }

  return Object.freeze(startingText)
}

export default StartingText
