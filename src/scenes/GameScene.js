import Scene from '../core/Scene'

import Player from '../objects/Player'
import ScoreText from '../objects/ScoreText'
import StartingText from '../objects/StartingText'
import GameOverText from '../objects/GameOverText'
import SpeedText from '../objects/SpeedText'
import SonicCursor from '../objects/SonicCursor'
import GameBG from '../objects/GameBG'
import Coin from '../objects/Coin'
import Tails from '../objects/Tails'
import TopBar from '../objects/TopBar'

const GameScene = Scene({
  objects: [
    GameBG,
    TopBar,
    GameOverText,
    ScoreText,
    SpeedText,
    StartingText,
    Player,
    SonicCursor
  ],
  effects: {
    startGame: engine => {
      engine.soundBank.play({ sound: 'bg', loop: true })
      engine.runEffect('spawnCoin')
      engine.runEffect('spawnTails')
    },
    gameOver: engine => {
      const { coinHandle, tailsHandle } = engine.getState()
      engine.setState({ gameIsOver: true })
      clearInterval(coinHandle)
      clearInterval(tailsHandle)
      engine.soundBank.pauseAll()
      engine.soundBank.play({ sound: 'gameOver' })
    },
    spawnCoin: engine => {
      const coinHandle = setInterval(() => {
        const coin = Coin({ engine })
        engine.addObject(coin)
        setTimeout(() => {
          if (engine.getObjects().includes(coin) && engine.isRunning()) {
            engine.runEffect('gameOver')
          }

          engine.removeObject(coin)
        }, engine.getState().secondsPerCoin * 1000 - 10)
      }, engine.getState().secondsPerCoin * 1000)

      engine.setState({ coinHandle })
    },
    spawnTails: engine => {
      const tailsHandle = setTimeout(() => {
        if (engine.getState().gameIsOver) return
        const tails = Tails({ engine })
        engine.addObject(tails)
        engine.runEffect('spawnTails')
      }, engine.getState().secondsPerTails * 1000)

      engine.setState({ tailsHandle })
    },
    startListeningForPause: engine => {
      window.addEventListener('keydown', e => {
        if (e.key !== 'p') return
        engine.togglePause()
      })
    },
    startListeningForRestart: engine => {
      window.addEventListener('keydown', e => {
        if (e.key !== 'r' || !engine.getState().gameIsOver) return
        engine.setScene('game')
      })
    }
  },
  state: {
    coinHandle: null,
    tailsHandle: null,
    secondsPerCoin: 3,
    secondsPerTails: 12,
    score: 0,
    gameIsOver: false,
    paused: false
  },
  onEnter: engine => {
    engine.runEffect('startGame')
    engine.runEffect('startListeningForPause')
    engine.runEffect('startListeningForRestart')
  },
  onExit: engine => {
    engine.soundBank.pauseAll()
  }
})

export default GameScene
