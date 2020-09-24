import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap, TweenMax} from 'gsap'

import DolphinsTexture from '../../textures/low-poly-dolphin/out.glb'

export default class Dolphins{
  constructor(_options){
    // Options
    this.sizes = _options.sizes
    this.time = _options.time

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false
    this.loader = new GLTFLoader()
    this.clock = new THREE.Clock()

    this.setDolphins()
  }
  setDolphins(){
    this.loader.load(DolphinsTexture, (model) => {
      model.scene.position.set(400, -400, -150)
      model.scene.scale.set(0.3,0.3,0.3)
      model.scene.rotateY(Math.PI/2)
      this.scene = model.scene
      // model.scene.rotateX(-Math.PI/5)
      this.mixer = new THREE.AnimationMixer( this.scene )
      this.action = this.mixer.clipAction( model.animations[ 0 ] ) // play the first animation
      this.action.play()
      console.log(model)
      this.container.add(this.scene)
      this.setDolphinsMovement()
    })
  }
  setDolphinsMovement(){
    this.time.on('tick', ()=>{
      this.delta = this.clock.getDelta()
      this.mixer.update( this.delta ) 
      if(this.scene.position.x > 400 || this.scene.position.x < -400){
        this.container.remove(this.scene)
        this.setDolphins()
      }
    })
    setInterval(()=>{
      TweenMax.to(this.scene.position, {
        duration: 2.66,
        delay: 0.1,
        x: this.scene.position.x - 80,
      })
    }, 2700)
  }
}