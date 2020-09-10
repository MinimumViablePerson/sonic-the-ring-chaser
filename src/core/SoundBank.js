function SoundBank({ basePath, ...soundSources }) {
  let createSoundSourceUrls = () => {
    for (const soundName in soundSources) {
      const filePath = soundSources[soundName]
      fetch(`${basePath}/${filePath}`)
        .then(resp => resp.blob())
        .then(blob => {
          const audioSrc = window.URL.createObjectURL(blob)
          soundSources[soundName] = audioSrc
        })
    }
  }

  let play = ({ sound = '', loop = false, volume = 1 }) => {
    const audio = new Audio(soundSources[sound])
    audio.play()
    audio.loop = loop
    audio.volume = volume

    playing = [audio, ...playing]
    audio.onended = () => {
      if (audio.loop) return
      playing = playing.filter(target => target !== audio)
    }
  }

  let clearPlaylist = () => {
    playing = []
  }

  let pauseAll = () => {
    playing.forEach(audio => audio.pause())
  }

  let resumeAll = () => {
    playing.forEach(audio => audio.play())
  }

  createSoundSourceUrls()
  let playing = []

  const soundBank = {
    play,
    resumeAll,
    pauseAll,
    clearPlaylist
  }

  return Object.freeze(soundBank)
}

export default SoundBank
