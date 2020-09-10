import Scene from '../core/Scene'
import TitleScreen from '../objects/TitleScreen'

const TitleScene = Scene({
  objects: [TitleScreen],
  effects: {
    startListeningForGameStart: engine => {
      const listener = e => {
        if (e.key !== 'Enter') return
        engine.setScene('game')
        window.removeEventListener('keydown', listener)
      }

      window.addEventListener('keydown', listener)
    }
  },
  state: {},
  onEnter: engine => {
    engine.runEffect('startListeningForGameStart')
  }
})

export default TitleScene
