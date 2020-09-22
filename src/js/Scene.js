import * as THREE from 'three'

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
 * Cursor
 */
// const cursor = { x: 0.5, y: 0.5 }
// window.addEventListener('mousemove', () =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = event.clientY / sizes.height - 0.5
// })

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
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
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.8})
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
 * Lights
 */
var light = new THREE.PointLight( 0x65aceb, 1, 3000 );
light.position.set( 0, 200, 0 );
scene.add( light );

window.addEventListener('keypress', (e) =>
{
    if(e.key === "s" || e.key === "S") {
      camera.position.y -= 10
    }else if(e.key === "z" || e.key === "Z") {
      camera.position.y += 10
    }
    console.log(camera.position.y)
})

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Update camera
    // camera.position.x = cursor.x * 0.5
    // camera.position.y = - cursor.y * 0.5
    // camera.lookAt(new THREE.Vector3())

    // Render
    renderer.render(scene, camera)
}

loop()