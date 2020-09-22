import './css/style.styl'
import './js/Intro.js'
import './js/Scene.js'

import groanSound from './sounds/groan.wav'
let sound = new Audio(groanSound)
document.querySelector('button').addEventListener('click', () => {
  sound.play()
})
