import { deepClone } from '../helpers'

function Engine({ canvas, soundBank, scenes, initialScene }) {
  if (initialScene === undefined) throw Error('Please select an initial scene.')
  let paused = false
  let scene = null

  let togglePause = () => {
    if (paused) resume()
    else pause()
  }

  let pause = () => {
    soundBank.pauseAll()
    soundBank.play('freeze')
    paused = true
  }

  let resume = () => {
    soundBank.resumeAll()
    paused = false
    render()
  }

  let render = () => {
    if (paused) return
    requestAnimationFrame(render)
    const { width, height } = canvas.element
    canvas.ctx.clearRect(0, 0, width, height)
    scene.objects.forEach(object => object.render())
  }

  let start = () => {
    render()
  }

  let addObject = object => {
    scene.objects = [...scene.objects, object]
  }

  let removeObject = target => {
    scene.objects = scene.objects.filter(object => object !== target)
  }

  let runEffect = (effectName, ...args) => {
    scene.effects[effectName](engine, ...args)
  }

  let setScene = sceneName => {
    if (scene !== null) scene.onExit(engine)

    const { state, makeObjects, effects, onEnter, onExit } = scenes[sceneName]

    scene = {
      state: deepClone(state),
      objects: makeObjects(engine),
      effects,
      onExit
    }

    scene.player = scene.objects.find(object => object.isPlayer)

    onEnter(engine)
  }

  let setState = newState => {
    scene.state = { ...scene.state, ...newState }
  }

  let isRunning = () => !paused

  let engine = {
    start,
    canvas,
    soundBank,
    getObjects: () => scene.objects,
    removeObject,
    addObject,
    getPlayer: () => scene.player,
    getState: () => scene.state,
    setState,
    runEffect,
    setScene,
    togglePause,
    isRunning
  }

  setScene(initialScene)

  return Object.freeze(engine)
}

export default Engine
