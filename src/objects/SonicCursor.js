import Cursor from '../core/Cursor'

function SonicCursor({ engine }) {
  const cursor = Cursor({ engine, source: '/src/assets/cursor.png' })

  return Object.freeze(cursor)
}

export default SonicCursor
