export const randomRange = (min, max) =>
  Math.round(min + Math.random() * (max - min))

export const rectCollision = (a, b) =>
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y

export const outOfBounds = (canvasElement, object, padding = 0) =>
  object.x - padding > canvasElement.width ||
  object.x + padding < 0 ||
  object.y - padding > canvasElement.height ||
  object.y + padding < 0

export const pickRandom = array =>
  array[Math.floor(Math.random() * array.length)]

export const deepClone = data => JSON.parse(JSON.stringify(data))
