import Rectangle from '../core/Rectangle'

const TopBar = ({ engine }) =>
  Rectangle({
    engine,
    x: 0,
    y: 0,
    width: engine.canvas.element.width,
    height: 35,
    color: '#00000090'
  })

export default TopBar
