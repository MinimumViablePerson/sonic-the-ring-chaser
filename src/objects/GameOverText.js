import Text from '../core/Text'

function GameOverText({ engine }) {
  let canvas = engine.canvas

  let text = Text({
    engine: engine,
    content: 'Game Over!',
    fontStyle: '50px lobster',
    color: 'white',
    y: canvas.element.height / 2.5,
    centered: true
  })

  let restartText = Text({
    engine: engine,
    content: 'Press "r" to restart',
    fontStyle: '25px lobster',
    color: 'white',
    y: canvas.element.height / 1.8,
    centered: true
  })

  const draw = () => {
    if (engine.getState().gameIsOver) {
      text.render()
      restartText.render()
    }
  }

  const render = () => {
    draw()
  }

  const gameOverText = { render }

  return Object.freeze(gameOverText)
}

export default GameOverText
