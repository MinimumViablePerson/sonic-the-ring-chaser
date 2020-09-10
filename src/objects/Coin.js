import Sprite from '../core/Sprite'
import { randomRange, rectCollision } from '../helpers'

function Coin({ engine }) {
  let canvas = engine.canvas

  let state = {
    width: 20,
    height: 20,
    x: randomRange(50, canvas.element.width - 20),
    y: randomRange(0, canvas.element.height - 20 - 50)
  }

  let sprite = Sprite({
    engine: engine,
    spritesheet: 'ring',
    ...state,
    frameRate: 2,
    sections: {
      idle: [
        {
          xOffset: 0,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 64,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 128,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 192,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 256,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 320,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 384,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 448,
          yOffset: 0,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 0,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 64,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 128,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 192,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 256,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 320,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 384,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 448,
          yOffset: 64,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 0,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 64,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 128,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 192,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 256,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 320,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 384,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 448,
          yOffset: 128,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 0,
          yOffset: 192,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 64,
          yOffset: 192,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 128,
          yOffset: 192,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 192,
          yOffset: 192,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 256,
          yOffset: 192,
          spriteWidth: 64,
          spriteHeight: 64
        },
        {
          xOffset: 320,
          yOffset: 192,
          spriteWidth: 64,
          spriteHeight: 64
        }
      ]
    }
  })

  const collided = () => {
    const playerState = engine.getPlayer().getState()
    return rectCollision(state, playerState)
  }

  const checkIfCollided = () => {
    if (collided()) {
      engine.soundBank.play({ sound: 'rings' })
      engine.removeObject(coin)
      engine.setState({ score: engine.getState().score + 20 })
      engine.getPlayer().slowDownBy(0.25)
    }
  }

  const draw = () => {
    sprite.render({ x: state.x, y: state.y })
  }

  const render = () => {
    checkIfCollided()
    draw()
  }

  const coin = { render }

  return Object.freeze(coin)
}

export default Coin
