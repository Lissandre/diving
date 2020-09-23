import WhaleSound from '../../sounds/whale.wav'
import Exhale00 from '../../sounds/exhale/exhale00.mp3'
import Exhale01 from '../../sounds/exhale/exhale01.mp3'
import Exhale02 from '../../sounds/exhale/exhale02.mp3'
import Exhale03 from '../../sounds/exhale/exhale03.mp3'
import Exhale04 from '../../sounds/exhale/exhale04.mp3'
import Exhale05 from '../../sounds/exhale/exhale05.mp3'
import Exhale06 from '../../sounds/exhale/exhale06.mp3'
import Exhale07 from '../../sounds/exhale/exhale07.mp3'
import Exhale08 from '../../sounds/exhale/exhale08.mp3'
import Exhale09 from '../../sounds/exhale/exhale09.mp3'
import Exhale10 from '../../sounds/exhale/exhale10.mp3'
import Inhale00 from '../../sounds/inhale/detendeur00.mp3'
import Inhale01 from '../../sounds/inhale/detendeur01.mp3'
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
    this.setWhaleSound()
    this.setBreathe()
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
  setWhaleSound(){
    this.whalesound = new Audio(WhaleSound)
    setTimeout(()=>{
        this.whalesound.play()
        this.setWhaleSound()
      },
      Math.random()*60000+60000
    )
  }
  setBreathe(){
    this.inhaleSounds = [ new Audio(Inhale00), new Audio(Inhale01) ]
    this.exhaleSounds = [ new Audio(Exhale00), new Audio(Exhale01), new Audio(Exhale02), new Audio(Exhale03), new Audio(Exhale04), new Audio(Exhale05), new Audio(Exhale06), new Audio(Exhale07), new Audio(Exhale08), new Audio(Exhale09), new Audio(Exhale10) ]
    setInterval(()=>{
      this.ins = this.inhaleSounds[Math.floor(Math.random()*this.inhaleSounds.length)]
      this.ins.volume = 0.2
      this.ins.play()
    },
    6000)
    setInterval(()=>{
      setTimeout(()=>{
        this.exs = this.exhaleSounds[Math.floor(Math.random()*this.exhaleSounds.length)]
        this.exs.volume = 1
        this.exs.play()
      },
      2000)
    },
    6000)
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