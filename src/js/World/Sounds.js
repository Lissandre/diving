export default class Sounds
{
  constructor(_options){
    // Options
    this.camera = _options.camera

    // Set up
    const BaseAudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new BaseAudioContext()
    this.amp = this.context.createGain()

    this.setHeartbeat()
  }
  setHeartbeat(){
    setInterval(()=>{
      this.playOscillator(
        this.context.currentTime,
        this.context.currentTime+0.05,
        Math.abs((this.camera.instance.position.y/2500))*1+0.05,
        10
      )
    }, 2500)
    setInterval(()=>{
      this.playOscillator(
        this.context.currentTime+0.38,
        this.context.currentTime+0.43,
        Math.abs((this.camera.instance.position.y/2500))*1+0.05,
        10
      )
    }, 2500)
  }
  setDepthNoise(){
    this.playOscillator(
      this.context.currentTime,
      false,
      Math.abs((camera.position.y/2500))*0.21+0.02,
      45
    )
  }
  playOscillator(start, end, gain, frequency){
    this.oscillator = this.context.createOscillator()
    this.oscillator.frequency.value = frequency
    this.amp.gain.setValueAtTime(gain, start)
    this.oscillator.connect(this.amp).connect(this.context.destination)
    this.oscillator.start(start)
    if(end){
      this.oscillator.stop(end)
    }
  }
}
/**
 * Sounds
 */
// const BaseAudioContext = window.AudioContext || window.webkitAudioContext
// const context = new BaseAudioContext()
// const amp = context.createGain()
// amp.gain.setValueAtTime(0.05, context.currentTime)
// setInterval(()=>{playOscillator(context.currentTime, context.currentTime+0.05)}, 2500)
// setInterval(()=>{playOscillator(context.currentTime+0.38, context.currentTime+0.43)}, 2500)
// function playOscillator(startTime, endTime) {
//   const oscillatorHeart = context.createOscillator();
//   oscillatorHeart.frequency.value = 10
//   oscillatorHeart.connect(amp).connect(context.destination);
//   oscillatorHeart.start(startTime);
//   oscillatorHeart.stop(endTime);
// }
// document.querySelector('#beginButton').addEventListener('click', ()=>{setTimeout(() => {startOscillo()}, 2000)})
// function startBreathe(){
  // let breathesound = new Audio(breathe)
  // breathesound.loop = true
  // setTimeout(() => {breathesound.play()}, 4000)
// }
// startBreathe()
// const ampnoise = context.createGain()
// ampnoise.gain.setValueAtTime(0.02, context.currentTime)
// function startOscillo(){
//   const oscillator = context.createOscillator()
//   oscillator.frequency.value = 45
//   oscillator.connect(ampnoise).connect(context.destination)
//   oscillator.start()
// }