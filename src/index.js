import Canvas from './core/Canvas'
import Engine from './core/Engine'
import soundBank from './objects/SonicSoundBank'

import GameScene from './scenes/GameScene'
import TitleScene from './scenes/TitleScene'

const canvas = Canvas({
  target: document.body,
  width: 500,
  height: 400
})

const engine = Engine({
  canvas,
  soundBank,
  scenes: {
    title: TitleScene,
    game: GameScene
  },
  initialScene: 'title'
})

engine.start()
