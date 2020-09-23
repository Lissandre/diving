import drownSound from '../../../sounds/smooth_drowning.wav'
import groanSound from '../../../sounds/groan.wav'

const $intro = document.querySelector('#intro'), $introContent = intro.querySelector('#introSentences'), $startBtn = intro.querySelector('#beginButton')
const sentences = [
  'Jé fé la mer lol'
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
        // clearInterval(interval)
    }, 500)
  }
}
let interval = null
$startBtn.addEventListener('click', () => {
    $startBtn.style.display = 'none'
    interval = setInterval(() => circleTexts(), 2500)
    circleTexts()
    let drownsound = new Audio(drownSound)
    setTimeout(() => {drownsound.play()}, 1465)
    let groansound = new Audio(groanSound)
    setTimeout(() => {groansound.play()}, 4700)
})