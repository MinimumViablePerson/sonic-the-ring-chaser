function Cursor({ engine, source }) {
  let canvas = engine.canvas

  let x = 0
  let y = 0

  let image = new Image()
  image.src = source

  window.addEventListener('mousemove', e => {
    const { top, left } = canvas.element.getBoundingClientRect()
    x = e.x - left
    y = e.y - top
  })

  function draw() {
    if (!engine.getState().gameIsOver) return
    canvas.ctx.drawImage(image, x, y, 30, 30)
  }

  function render() {
    draw()
  }

  const cursor = { render }

  return Object.freeze(cursor)
}

export default Cursor
