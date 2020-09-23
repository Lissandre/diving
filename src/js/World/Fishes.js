import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap, TweenMax } from 'gsap'

import Fish from '../../textures/Rudd_Fish.glb'

export default class Fishes{
  constructor(_options){
    // Options
    this.sizes = _options.sizes
    this.time = _options.time

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false
    this.fishesList = []
    this.loader = new GLTFLoader()
    this.posMax = [-400, 400]

    for (let i = 0; i < 1500; i++) {
      this.setFishes()
    }
    this.setMovement()
    setInterval(()=>{this.setAnimation()}, 400)
  }
  setFishes(border){
    this.loader.load(Fish, (gltf) => {
      gltf.scene.scale.set(0.05,0.05,0.05)
      if(border === true){
        gltf.scene.position.set(
          this.posMax[Math.round(Math.random())],
          Math.floor(Math.random()*4000)-3000,
          Math.floor(Math.random()*400)-200
        )
      }else{
        gltf.scene.position.set(
          Math.floor(Math.random()*800)-400,
          Math.floor(Math.random()*4000)-3000,
          Math.floor(Math.random()*400)-200
        )
      }
      gltf.scene.rotateY(Math.round(Math.random())*Math.PI)
      this.container.add(gltf.scene)
      this.fishesList.push(gltf.scene)
    })
  }
  setMovement(){
    this.time.on('tick', ()=>{
      this.fishesList.forEach(fish => {
        TweenMax.to(fish.position, {
          duration: 0.05,
          x: (fish.rotation.y === 0) ? fish.position.x - 0.2 : fish.position.x + 0.2,
        })
        if(fish.position.x > 400 || fish.position.x < -400){
          this.container.remove(fish)
          this.fishesList.splice(this.fishesList.indexOf(fish), 1)
          this.setFishes(true)
        }
      })
    })
  }
  setAnimation(){
    
  }
}