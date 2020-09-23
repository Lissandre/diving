import * as THREE from 'three'
import { gsap, TweenMax } from 'gsap'

export default class Bubbles
{
  constructor(_options){
    // Options
    this.sizes = _options.sizes
    this.time = _options.time

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false
    this.bubblesList = []

    for (let i = 0; i < 2000; i++) {
      this.setBubbles()
    }
    this.setMovement()
  }
  setBubbles(bottom){
    this.bubble = new THREE.Points(
      new THREE.SphereGeometry(0.01, 1, 1),
      new THREE.PointsMaterial( { color: 0xffffff, opacity: 0.1, transparent: true, } )
    )
    if(bottom === true){
      this.bubble.position.set(
        Math.floor(Math.random()*800)-400,
        -3000,
        Math.floor(Math.random()*400)-200
      )
      }else{
      this.bubble.position.set(
        Math.floor(Math.random()*800)-400,
        Math.floor(Math.random()*4000)-3000,
        Math.floor(Math.random()*400)-200
      )
    }
    this.container.add(this.bubble)
    this.bubblesList.push(this.bubble)
  }
  setMovement(){
    this.time.on('tick', ()=>{
      this.bubblesList.forEach(bubble => {
        TweenMax.to(bubble.position, {
          duration: 0.05,
          x: bubble.position.x + (Math.random()-0.5)/2,
          y: bubble.position.y + (Math.random()-0.1)/2,
          z: bubble.position.z + (Math.random()-0.5)/2,
        })
        if(bubble.position.y >= 1000){
          this.container.remove(bubble)
          this.bubblesList.splice(this.bubblesList.indexOf(bubble), 1)
          this.setBubbles(true)
        }
      });
    })
  }
}