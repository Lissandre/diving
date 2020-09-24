import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { gsap, TweenMax } from 'gsap'

import WhaleTexture from '../../textures/Whale.fbx'

export default class Whale{
  constructor(_options){
    // Options
    this.sizes = _options.sizes
    this.time = _options.time

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false
    this.loader = new FBXLoader()
    this.clock = new THREE.Clock()

    this.setWhale()
  }
  setWhale(){
    this.loader.load(WhaleTexture, (object) => {
      //object.children[1].scale.set(0.0005,,0.0005)
      this.scene = object
      this.scene.position.set(
        -400,
        -1100,
        -150)
      this.container.add(this.scene)
      this.scene.scale.set(0.2, 0.2, 0.2)
      this.scene.rotateY(Math.PI/2)
      this.mixer = new THREE.AnimationMixer( this.scene )
      this.action = this.mixer.clipAction( this.scene.animations[ 1 ] ) // play the first animation
      this.action.play()
      this.setAnimationWhale()
    })
  }
  setAnimationWhale(){
    this.time.on('tick', ()=>{
      this.delta = this.clock.getDelta()
      this.mixer.update( this.delta ) 
      TweenMax.to(this.scene.position, {
        duration: 0.05,
        x: this.scene.position.x + 0.3,
      })
      if(this.scene.position.x > 400 || this.scene.position.x < -400){
        this.container.remove(this.scene)
        this.setWhale()
      }
    })
  }
}