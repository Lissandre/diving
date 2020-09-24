import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import World from './World/index.js'
import Time from './Utils/Time.js'
import ScreenSaver from './Utils/CanvasSaver.js'
import Microphone from './Utils/MicrophoneStream.js'

import Camera from './Camera.js'

export default class Application
{
  constructor(_options){
    // Options
    this.$canvas = _options.$canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()

    this.setRenderer()
    this.setCamera()
    this.setWorld()
    this.setSaver()
    this.setMicrophone()
  }
  setRenderer(){
    // Scene
    this.scene = new THREE.Scene()

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      alpha: true
    })

    // this.renderer.setClearColor(0x414141, 1)
    this.renderer.setClearColor(0x000000, 1)

    // this.renderer.setPixelRatio(Math.min(Math.max(windowdevicePixelRatio, 1.5), 2))
    this.renderer.setPixelRatio(2)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)

    // Resize event
    this.sizes.on('resize', () =>
    {
      this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    })

    this.time.on('tick', () =>
    {
      // Renderer
      this.renderer.render(this.scene, this.camera.instance)
    })
  }
  setCamera(){
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer
    })

    this.scene.add(this.camera.container)
  }
  setWorld(){
    this.world = new World({
      time: this.time,
      sizes: this.sizes,
      camera: this.camera,
      renderer: this.renderer
    })

    this.scene.add(this.world.container)
  }
  setSaver(){
    this.saver = new ScreenSaver({
      canvas: this.$canvas,
      renderer: this.renderer,
      camera: this.camera,
      scene: this.scene
    })
  }
  setMicrophone(){
    this.microphone = new Microphone({
      time: this.time,
      camera: this.camera,
    })
  }
}