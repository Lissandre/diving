import drownSound from '../../../sounds/smooth_drowning.wav'
import groanSound from '../../../sounds/groan.wav'

export default class IntroSection{
  constructor(_options){
    // Options
    // Set up
    this.introContainer = document.querySelector('#intro')
    this.introContent = this.introContainer.querySelector('#introSentences')
    this.startButton = this.introContainer.querySelector('#beginButton')
    this.sentences = ['Jé fé la mer lol', 'Pose toi la zone', 'Un max de détente bb']
    this.sIndex = 0

    this.startIntro()
    //this.destroyIntro()
  }
  startIntro(){
    this.startButton.addEventListener('click', () => {
      this.startButton.style.display = 'none'
      this.interval = setInterval(() => this.changeText(), 2500)
      this.changeText()
      this.drownsound = new Audio(drownSound)
      setTimeout(() => {this.drownsound.play()}, 1465)
      this.groansound = new Audio(groanSound)
      setTimeout(() => {this.groansound.play()}, 4700)
    })
  }
  destroyIntro(){
    this.introContainer.style.opacity = '0'
    setTimeout(() => {
      this.introContainer.style.display = 'none'
      clearInterval(this.interval)
    }, 500)
  }
  changeText(){
    if (this.sIndex < this.sentences.length) {
      this.introContent.innerText = this.sentences[this.sIndex]
      this.introContent.style.opacity = 1
      setTimeout(() => {
          this.introContent.style.opacity = 0
      }, 1500)
      this.sIndex += 1
    }
    else{
      this.destroyIntro()
    }
  }
}