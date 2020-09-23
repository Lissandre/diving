import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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


    this.setDolphins()
  }
  setDolphins(){
    this.loader.load(DolphinsTexture, (model) => {
      model.scene.position.set(100, -400, -150)
      model.scene.scale.set(0.3,0.3,0.3)
      model.scene.rotateY(2*Math.PI/3)
      model.scene.rotateX(-Math.PI/5)
      this.container.add(model.scene)
    })
  }
}