function Text({
  engine,
  content = 'example text',
  x = 10,
  y = 10,
  color = 'white',
  fontStyle = '30px sans-serif',
  centered = false,
  background = null
}) {
  let properties = {
    engine,
    content,
    x,
    y,
    color,
    fontStyle,
    centered,
    background
  }

  let update = newProperties => {
    properties = { ...properties, ...newProperties }
  }

  let draw = () => {
    const {
      content,
      x,
      y,
      color,
      fontStyle,
      centered,
      background,
      engine: {
        canvas: { ctx, element }
      }
    } = properties

    ctx.font = fontStyle
    ctx.textBaseline = 'hanging'

    const textDimensions = ctx.measureText(content)
    const centeredWidth = element.width / 2 - textDimensions.width / 2

    if (background !== null) {
      ctx.fillStyle = background
      window.textDimensions = textDimensions
      ctx.fillRect(
        centered ? centeredWidth - 5 : x - 5,
        y - 5,
        textDimensions.width + 10,
        textDimensions.actualBoundingBoxDescent + 10
      )
    }

    ctx.fillStyle = color

    if (centered) {
      ctx.fillText(content, centeredWidth, y)
    } else {
      ctx.fillText(content, x, y)
    }
  }

  let render = () => {
    draw()
  }

  const text = { update, render }

  return Object.freeze(text)
}

export default Text
