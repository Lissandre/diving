const BaseAudioContext = window.AudioContext || window.webkitAudioContext
const context = new BaseAudioContext()
const amp = context.createGain()
amp.gain.setValueAtTime(2.5, context.currentTime)

let dtime = 0
setInterval(()=>{playOscillator(context.currentTime, context.currentTime+0.05); dtime++}, 2500)
setInterval(()=>{playOscillator(context.currentTime+0.38, context.currentTime+0.43); dtime++}, 2500)

function playOscillator(startTime, endTime) {
  const oscillatorHeart= context.createOscillator();
  oscillatorHeart.frequency.value = 10
  oscillatorHeart.connect(amp).connect(context.destination);
  oscillatorHeart.start(startTime);
  oscillatorHeart.stop(endTime);
}