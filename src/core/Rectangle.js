function Rectangle({ engine, x, y, width, height, color }) {
  let properties = { engine, x, y, width, height, color }

  let update = newProps => {
    properties = { ...properties, ...newProps }
  }

  let draw = () => {
    let { engine, x, y, width, height, color } = properties

    engine.canvas.ctx.fillStyle = color
    engine.canvas.ctx.fillRect(x, y, width, height)
  }

  let render = () => {
    draw()
  }

  const rectangle = { render, update }

  return Object.freeze(rectangle)
}

export default Rectangle
