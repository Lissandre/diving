import drownSound from '../sounds/smooth_drowning.wav'
import groanSound from '../sounds/groan.wav'

const $intro = document.querySelector('#intro'), $introContent = intro.querySelector('#introSentences'), $startBtn = intro.querySelector('#beginButton')
const sentences = [
  // 'Dans un monde où le bruit reigne',
  // 'Imaginez nne serait-ce qu\'un instant...',
  // 'Le calme des profondeurs'
  'Phrase intro 1',
  'Phrase intro 2'
]
let sIndex = 0
function circleTexts() {
  if (sIndex < sentences.length) {
      $introContent.innerText = sentences[sIndex]
      $introContent.style.opacity = 1
      setTimeout(() => {
          $introContent.style.opacity = 0
      }, 1500)
      sIndex += 1
  } else {
      $intro.style.opacity = '0'
      
      setTimeout(() => {
        $intro.style.display = 'none'
        clearInterval(interval)
    }, 500)
  }
}
let interval = null
function startOscillo(){
  const BaseAudioContext = window.AudioContext || window.webkitAudioContext
  const context = new BaseAudioContext()
  const oscillator = context.createOscillator()
  oscillator.frequency.value = 45
  const amp = context.createGain()
  amp.gain.setValueAtTime(0.1, context.currentTime)
  oscillator.connect(amp).connect(context.destination)
  oscillator.start()
}
$startBtn.addEventListener('click', () => {
    $startBtn.style.display = 'none'
    interval = setInterval(() => circleTexts(), 2500)
    circleTexts()
    let drownsound = new Audio(drownSound)
    setTimeout(() => {drownsound.play()}, 1465)
    setTimeout(() => {startOscillo()}, 2000)
    let groansound = new Audio(groanSound)
    setTimeout(() => {groansound.play()}, 4700)
})
