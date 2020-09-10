import Sprite from '../core/Sprite'

const getInitialState = engine => ({
  sidePadding: 0,
  x: 0,
  y: 0,
  width: 30,
  height: 40,
  canvas: engine.canvas,
  floorHeight: engine.canvas.element.height - 45,
  smashing: false,
  smashPower: 10,
  speed: 5,
  gravity: 0.5,
  friction: 0.5,
  jumping: false,
  jumps: 0,
  maxJumps: 3,
  jumpPower: 11,
  velocity: {
    x: 0,
    y: 0
  },
  runningRight: false,
  runningLeft: false
})

function Player({ engine }) {
  let state = getInitialState(engine)

  let sprite = Sprite({
    engine,
    x: state.x,
    y: state.y,
    spritesheet: 'sonic',
    width: state.width,
    height: state.height,
    frameRate: 10,
    sections: {
      walkingRight: [
        {
          xOffset: 425,
          yOffset: 73,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 470,
          yOffset: 73,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 515,
          yOffset: 73,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 560,
          yOffset: 73,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 615,
          yOffset: 73,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 665,
          yOffset: 73,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 10,
          yOffset: 138,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 55,
          yOffset: 138,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 100,
          yOffset: 138,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 145,
          yOffset: 138,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 190,
          yOffset: 138,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 245,
          yOffset: 138,
          spriteWidth: 32,
          spriteHeight: 43
        }
      ],
      idle: [
        {
          xOffset: 15,
          yOffset: 10,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 60,
          yOffset: 10,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 105,
          yOffset: 10,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 150,
          yOffset: 10,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 195,
          yOffset: 10,
          spriteWidth: 32,
          spriteHeight: 43
        }
      ],
      idleLeft: [
        {
          xOffset: 688 - 45 * 0,
          yOffset: 582,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 688 - 45 * 1,
          yOffset: 582,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 688 - 45 * 2,
          yOffset: 582,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 688 - 45 * 3,
          yOffset: 582,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 688 - 45 * 4,
          yOffset: 582,
          spriteWidth: 32,
          spriteHeight: 43
        }
      ],
      walkingLeft: [
        {
          xOffset: 275,
          yOffset: 646,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 230,
          yOffset: 646,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 185,
          yOffset: 646,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 140,
          yOffset: 646,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 85,
          yOffset: 646,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 35,
          yOffset: 646,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 688,
          yOffset: 711,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 643,
          yOffset: 711,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 598,
          yOffset: 711,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 553,
          yOffset: 711,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 508,
          yOffset: 711,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 453,
          yOffset: 711,
          spriteWidth: 32,
          spriteHeight: 43
        }
      ],
      jumping: [
        {
          xOffset: 10,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 50,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 85,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 130,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 175,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 210,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 250,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },

        {
          xOffset: 290,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 330,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 370,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        }
      ],
      falling: [
        {
          xOffset: 425,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 480,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        },
        {
          xOffset: 535,
          yOffset: 523,
          spriteWidth: 32,
          spriteHeight: 43
        }
      ]
    },
    defaultSection: 'falling'
  })

  const startMove = ({ key }) => {
    switch (key) {
      case ' ':
      case 'ArrowUp':
        state.jumping = true
        break
      case 'ArrowLeft':
        state.runningLeft = true
        break
      case 'ArrowRight':
        state.runningRight = true
        break
      case 'ArrowDown':
        state.smashing = true
        break
      default:
        return
    }
  }

  const stopMove = ({ key }) => {
    switch (key) {
      case 'ArrowLeft':
        state.runningLeft = false
        break
      case 'ArrowRight':
        state.runningRight = false
        break
      default:
        return
    }
  }

  const applyGravity = () => {
    if (state.y > state.floorHeight - state.height) {
      state.y = state.floorHeight - state.height
      state.velocity.y = 0
      state.jumps = 0
      state.smashing = false
    } else {
      state.velocity.y += state.gravity
    }
  }

  const applyFriction = () => {
    if (state.velocity.x > 1) {
      state.velocity.x -= state.friction
    } else if (state.velocity.x < -1) {
      state.velocity.x += state.friction
    } else {
      state.velocity.x = 0
    }
  }

  const updateVelocity = () => {
    if (state.runningLeft) {
      state.velocity.x = -state.speed
    }

    if (state.runningRight) {
      state.velocity.x = state.speed
    }

    if (
      state.x >
      state.canvas.element.width - state.width - state.sidePadding
    ) {
      state.x = state.canvas.element.width - state.width - state.sidePadding
      state.velocity.x = 0
      state.runningRight = false
    }

    if (state.x < state.sidePadding) {
      state.x = state.sidePadding
      state.velocity.x = 0
      state.runningLeft = false
    }

    if (state.jumping) {
      state.jumping = false
      state.jumps++
      if (state.jumps <= state.maxJumps) {
        engine.soundBank.play({ sound: 'jump', volume: 0.4 })
        state.velocity.y = -state.jumpPower
      }
    }

    if (state.smashing) {
      state.velocity.y += state.smashPower
    }
  }

  const applyVelocity = () => {
    state.y += state.velocity.y
    state.x += state.velocity.x
  }

  const updateAnimation = () => {
    if (state.velocity.y <= -1) {
      sprite.play('jumping', 5)
      return
    }

    if (state.velocity.y >= 1) {
      sprite.play('falling', 5)
      return
    }

    if (state.velocity.x > 0) {
      sprite.play('walkingRight', 12 / state.speed)
      return
    }

    if (state.velocity.x < 0) {
      sprite.play('walkingLeft', 12 / state.speed)
      return
    }

    if (state.velocity.x === 0) {
      if (
        sprite.getCurrentSection() === sprite.sections.walkingLeft ||
        sprite.getCurrentSection() === sprite.sections.idleLeft
      ) {
        sprite.play('idleLeft', 10)
      } else {
        sprite.play('idle', 10)
      }
      return
    }
  }

  const slowDownBy = amount => {
    state.speed -= amount
  }

  const speedUpBy = amount => {
    state.speed += amount
  }

  const draw = () => {
    sprite.render({ x: state.x, y: state.y })
  }

  const reset = () => {
    state = InitialState(engine)
  }

  const render = () => {
    updateVelocity()
    applyVelocity()
    applyGravity()
    updateAnimation()
    applyFriction()
    draw()
  }

  window.addEventListener('keydown', startMove)
  window.addEventListener('keyup', stopMove)

  const player = {
    render,
    slowDownBy,
    speedUpBy,
    reset,
    getState: () => state,
    isPlayer: true
  }

  return Object.freeze(player)
}

export default Player
