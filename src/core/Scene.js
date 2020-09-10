function Scene({
  objects = [],
  effects = [],
  state = {},
  onEnter = engine => {},
  onExit = engine => {}
}) {
  const scene = {
    makeObjects: engine => objects.map(object => object({ engine })),
    effects,
    state,
    onEnter,
    onExit
  }
  return Object.freeze(scene)
}

export default Scene
