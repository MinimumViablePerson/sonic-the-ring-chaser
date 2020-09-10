function BG({ engine, source }) {
  let canvas = engine.canvas
  let image = new Image()
  image.src = source

  let draw = () => {
    canvas.ctx.drawImage(
      image,
      0,
      0,
      canvas.element.width,
      canvas.element.height
    )
  }

  let render = () => {
    draw()
  }

  const bg = { render }

  return Object.freeze(bg)
}

export default BG
