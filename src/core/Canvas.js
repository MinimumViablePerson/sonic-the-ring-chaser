function Canvas({ target, ...options }) {
  let element = document.createElement('canvas')
  target.append(element)

  for (const [key, value] of Object.entries(options)) {
    element[key] = value
  }

  let ctx = element.getContext('2d')

  const canvas = { element, ctx }

  return Object.freeze(canvas)
}

export default Canvas
