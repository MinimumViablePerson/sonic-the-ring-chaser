function Sprite({
  engine,
  initialX = 0,
  initialY = 0,
  spritesheet,
  width = 40,
  height = 50,
  frameRate = 10,
  sections = {
    idle: [
      {
        xOffset: 0,
        yOffset: 0,
        spriteWidth: 100,
        spriteHeight: 100
      }
    ]
  },
  defaultSection = 'idle'
}) {
  let canvas = engine.canvas
  let currentFrameNumber = 0
  let framesPlayed = 0

  let image = new Image()
  image.src = `/src/assets/sprites/${spritesheet}.png`

  let currentSection = sections[defaultSection] || Object.values(sections)[0]

  const getCurrentSection = () => currentSection

  const getCurrentFrame = () => currentSection[currentFrameNumber]

  let draw = ({ x, y } = {}) => {
    const currentFrame = getCurrentFrame()

    if (currentFrame === undefined)
      throw Error(
        'No frame selected. Make sure you have at least one section with at least one frame in it.'
      )
    canvas.ctx.drawImage(
      image,
      currentFrame.xOffset,
      currentFrame.yOffset,
      currentFrame.spriteWidth,
      currentFrame.spriteHeight,
      x,
      y,
      width,
      height
    )
  }

  let nextFrame = () => {
    framesPlayed++
    currentFrameNumber =
      Math.floor(framesPlayed / frameRate) % currentSection.length
  }

  let play = (section, newFrameRate = 5) => {
    if (sections[section] === undefined) return
    if (sections[section] === currentSection) return

    frameRate = newFrameRate
    currentFrameNumber = 0
    currentSection = sections[section]
  }

  let render = ({ x = initialX, y = initialY } = {}) => {
    draw({ x, y })
    nextFrame()
  }

  const sprite = {
    render,
    play,
    sections,
    getCurrentFrame,
    getCurrentSection
  }

  return Object.freeze(sprite)
}

export default Sprite
