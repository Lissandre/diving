import * as THREE from 'three'
// import {OrbitControls} from '../../node_modules/three/examples/jsm/controls/OrbitControls'
import { gsap, TweenMax } from "gsap"

import './css/style.styl'
import './js/Intro.js'
import './js/Sounds.js'


/**
* Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
window.addEventListener('resize', () =>
{
  sizes.width = window.innerWidth
  windowHeight = window.innerHeight
  camera.aspect = sizes.width / windowHeight
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, windowHeight)
})
/**
 * Scene
 */
const scene = new THREE.Scene()
/**
 * Camera
 */
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 1, 4000)
camera.position.z = 3
scene.add(camera)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)
/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()
/**
 * Objects
 */
const material = new THREE.MeshPhongMaterial({color: 0x65aceb})
material.side = THREE.BackSide; 
const box = new THREE.Mesh(
  new THREE.BoxGeometry(800, 4000, 400),
  material
)
box.position.set(0, -1000, 0);
box.castShadow = true
box.receiveShadow = true
scene.add(box)
/**
 * Particles
 */
const particles = []
function createParticles(bottom) {
  const particle = new THREE.Points(
  new THREE.SphereGeometry(0.01, 1, 1),
  new THREE.PointsMaterial( { color: 0xffffff, opacity: 0.1, transparent: true, } )
  )
  if(bottom === true){
  particle.position.set(
    Math.floor(Math.random()*800)-400,
    -3000,
    Math.floor(Math.random()*400)-200
  );
  }else{
  particle.position.set(
    Math.floor(Math.random()*800)-400,
    Math.floor(Math.random()*4000)-3000,
    Math.floor(Math.random()*400)-200
  );
  }
  
  scene.add(particle)
  particles.push(particle)
}
for (let i = 0; i < 2000; i++) {
  createParticles()
}
/**
 * Lights
 */
let light = new THREE.PointLight( 0xfffffff, 1.8, 4000 );
light.position.set( 0, 300, 0 );
scene.add( light );
/**
 * Controls
 */
document.addEventListener('keypress', (e) =>
{
  if((e.key === "s" || e.key === "S") && camera.position.y > -2500) {
    TweenMax.to(camera.position, {
      duration: 0.3,
      y: camera.position.y - 15,
    });
  }else if((e.key === "z" || e.key === "Z") && camera.position.y < 0) {
    TweenMax.to(camera.position, {
      duration: 0.3,
      y: camera.position.y + 15,
    });
  }
})
document.addEventListener('mousewheel', (e)=>{
  if (e.wheelDeltaY>0 && camera.position.y < 0) {
    TweenMax.to(camera.position, {
      duration: 0.3,
      y: camera.position.y + e.wheelDeltaY/20,
    });
  }else if (e.wheelDeltaY<0 && camera.position.y > -2500) {
    TweenMax.to(camera.position, {
      duration: 0.3,
      y: camera.position.y + e.wheelDeltaY/20,
    });
  }
})
// const controls = new OrbitControls(camera, document.querySelector('canvas'));
// controls.target.set(0, 0, 0);
// controls.update();
// const cursor = { x: 0.5, y: 0.5 }
// window.addEventListener('mousemove', () =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = event.clientY / sizes.height - 0.5
// })
/**
 * Loop
 */
const loop = () =>
{
  window.requestAnimationFrame(loop)
  // Update camera
  // camera.rotation.x = cursor.x * 0.5
  // camera.rotation.y = - cursor.y * 0.5
  // camera.lookAt(new THREE.Vector3())
  particles.forEach(particle => {
    TweenMax.to(particle.position, {
    duration: 0.05,
    x: particle.position.x + (Math.random()-0.5)/2,
    y: particle.position.y + (Math.random()-0.1)/2,
    z: particle.position.z + (Math.random()-0.5)/2,
    });
    if(particle.position.y >= 1000){
    scene.remove(particle)
    particles.splice(particles.indexOf(particle), 1)
    createParticles(true)
    }
  });
  // Render
  renderer.render(scene, camera)
}
loop()