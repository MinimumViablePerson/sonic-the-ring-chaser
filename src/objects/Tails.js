import Sprite from '../core/Sprite'
import { randomRange, rectCollision, outOfBounds, pickRandom } from '../helpers'

function Tails({ engine }) {
  let canvas = engine.canvas
  let width = 40
  let height = 40

  let direction = Math.random() > 0.5 ? 'left' : 'right'
  let speed = Math.ceil(Math.random() * 7)

  engine.soundBank.play({
    sound: pickRandom(['tailsHereICome', 'tailsNoSee', 'tailsSonicHappy']),
    volume: 0.7
  })

  const state = {
    width,
    height,
    x: direction === 'right' ? -100 : canvas.element.width + 100,
    y: randomRange(0, canvas.element.height - height - 50),
    velocity: {
      x: direction === 'right' ? speed : -speed,
      y: 0
    }
  }

  const sprite = Sprite({
    engine,
    initialX: state.x,
    initialY: state.y,
    spritesheet: 'tails',
    width,
    height,
    sections: {
      idle: [
        {
          xOffset: 197,
          yOffset: 120,
          spriteWidth: 45,
          spriteHeight: 45
        },
        {
          xOffset: 243,
          yOffset: 120,
          spriteWidth: 45,
          spriteHeight: 45
        },
        {
          xOffset: 288,
          yOffset: 120,
          spriteWidth: 45,
          spriteHeight: 45
        },
        {
          xOffset: 330,
          yOffset: 120,
          spriteWidth: 45,
          spriteHeight: 45
        }
      ],
      idleLeft: [
        {
          xOffset: 260,
          yOffset: 320,
          spriteWidth: 45,
          spriteHeight: 45
        },
        {
          xOffset: 214,
          yOffset: 320,
          spriteWidth: 45,
          spriteHeight: 45
        },
        {
          xOffset: 169,
          yOffset: 320,
          spriteWidth: 45,
          spriteHeight: 45
        },
        {
          xOffset: 127,
          yOffset: 320,
          spriteWidth: 45,
          spriteHeight: 45
        }
      ]
    },
    defaultSection: direction === 'right' ? 'idle' : 'idleLeft',
    frameRate: 4
  })

  const collided = () => {
    const playerState = engine.getPlayer().getState()
    return rectCollision(state, playerState)
  }

  const checkIfCollided = () => {
    if (collided()) {
      engine.soundBank.play({
        sound: pickRandom(['tailsSupercharge', 'tailsYeah', 'tailsYeah2'])
      })
      engine.getPlayer().speedUpBy(1)
      engine.removeObject(tails)
    }
  }

  const checkIfOutOfBounds = () => {
    if (outOfBounds(canvas.element, state, 120)) {
      engine.soundBank.play({
        sound: pickRandom([
          'tailsScream',
          'tailsSorry',
          'tailsWakeUp',
          'tailsSonicUpset',
          'tailsUhOh'
        ])
      })
      engine.removeObject(tails)
    }
  }

  const draw = () => {
    sprite.render({ x: state.x, y: state.y })
  }

  const applyVelocity = () => {
    state.x += state.velocity.x
    state.y += state.velocity.y
  }

  const render = () => {
    checkIfCollided()
    checkIfOutOfBounds()
    applyVelocity()
    draw()
  }

  const tails = { render }

  return Object.freeze(tails)
}

export default Tails
