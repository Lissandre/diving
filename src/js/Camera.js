import * as THREE from 'three'
// import {OrbitControls} from '../../node_modules/three/examples/jsm/controls/OrbitControls'
import { gsap, TweenMax } from 'gsap'

export default class Camera
{
  constructor(_options){
    // Options
    this.sizes = _options.sizes

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false

    this.setInstance()
    this.setPosition()
    // this.setOrbitControls()
  }
  setInstance(){
    this.instance = new THREE.PerspectiveCamera(70, this.sizes.viewport.width / this.sizes.viewport.height, 1, 4000)
    this.container.add(this.instance)

    // Resize event
    this.sizes.on('resize', () =>
    {
      this.instance.aspect = this.sizes.viewport.width / this.sizes.viewport.height
      this.instance.updateProjectionMatrix()
    })
  }
  setPosition(){
    this.instance.position.z = 3

    // Key event
    document.addEventListener('keypress', (e) =>
    {
      if((e.key === "s" || e.key === "S") && this.instance.position.y > -2500) {
        TweenMax.to(this.instance.position, {
          duration: 0.3,
          y: (this.instance.position.y - 15 < -2500) ? -2500 : this.instance.position.y - 15,
        });
      }else if((e.key === "z" || e.key === "Z") && this.instance.position.y < 0) {
        TweenMax.to(this.instance.position, {
          duration: 0.3,
          y: ( this.instance.position.y + 15 ) > 0 ? 0 : this.instance.position.y + 15,
        });
      }
    })

    // Wheel event
    document.addEventListener('mousewheel', (e)=>{
      if (e.wheelDeltaY>0 && this.instance.position.y < 0) {
        TweenMax.to(this.instance.position, {
          duration: 0.3,
          y: ( this.instance.position.y + e.wheelDeltaY/20 ) > 0 ? 0 : this.instance.position.y + e.wheelDeltaY/20 ,
        });
      }else if (e.wheelDeltaY<0 && this.instance.position.y > -2500) {
        TweenMax.to(this.instance.position, {
          duration: 0.3,
          y: (this.instance.position.y + e.wheelDeltaY/20) < -2500 ? -2500 : this.instance.position.y + e.wheelDeltaY/20,
        });
      }
    })
  }
  setOrbitControls(){
    // Set up
    this.orbitControls = new OrbitControls(this.instance, this.renderer.domElement)
    this.orbitControls.enabled = false
    this.orbitControls.enableKeys = false
    this.orbitControls.zoomSpeed = 0.5
  }
}