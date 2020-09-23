import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

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

    this.setWhale()
  }
  setWhale(){
    this.loader.load(WhaleTexture, (object) => {
      //object.children[1].scale.set(0.0005,,0.0005)
      object.position.set(
        -50,
        -1100,
        -150)
      this.container.add(object)
      object.scale.set(0.2, 0.2, 0.2)
      object.rotateY(Math.PI/2)
      
    })
  }
}