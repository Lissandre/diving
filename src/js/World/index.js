import * as THREE from 'three'

import Sounds from './Sounds.js'
import Fishes from './Fishes.js'
import Whale from './Whale.js'
import Dolphins from './Dolphins.js'

import Bubbles from './Particles/Bubbles.js'

import IntroSection from './Sections/IntroSection.js'
import HUDSection from './Sections/HUDSection.js'

export default class{
  constructor(_options){
    // Options
    this.time = _options.time
    this.sizes = _options.sizes
    this.camera = _options.camera
    this.renderer = _options.renderer

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false

    this.setSounds()
    this.setBubbles()
    this.setFishes()
    this.setWhale()
    this.setDolphins()
    this.setSkybox()
    this.setHUD()
    this.setLight()
    this.setIntro()
  }
  setSounds(){
    document.querySelector('#beginButton').addEventListener('click', () =>{
      this.sounds = new Sounds({
        camera: this.camera
      })
    })
  }
  setWhale(){
    this.whale = new Whale({
      sizes: this.sizes,
      time: this.time
    })
    this.container.add(this.whale.container)
  }
  setDolphins(){
    this.dolphins = new Dolphins({
      sizes: this.sizes,
      time: this.time
    })
    this.container.add(this.dolphins.container)
  }
  setFishes(){
    this.fishes = new Fishes({
      sizes: this.sizes,
      time: this.time
    })
    this.container.add(this.fishes.container)
  }
  setBubbles(){
    this.bubbles = new Bubbles({
      sizes: this.sizes,
      time: this.time
    })
    this.container.add(this.bubbles.container)
  }
  setSkybox(){
    this.skymaterial = new THREE.MeshPhongMaterial({color: 0x65aceb})
    this.skymaterial.side = THREE.BackSide
    this.skybox = new THREE.Mesh(
      new THREE.BoxGeometry(800, 4000, 400),
      this.skymaterial
    )
    this.skybox.position.set(0, -1000, 0)
    this.skybox.castShadow = true
    this.skybox.receiveShadow = true
    this.container.add(this.skybox)
  }
  setHUD(){
    this.hud = new HUDSection({
      camera: this.camera,
      time: this.time
    })
  }
  setLight(){
    this.light = new THREE.PointLight( 0xfffffff, 1.8, 4000 )
    this.light.position.set(0, 300, 0)
    this.container.add(this.light)
  }
  setIntro(){
    this.intro = new IntroSection()
  }
}