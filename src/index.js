import './css/style.styl'
import * as THREE from 'three'

// import planetTexture from './textures/planet/globe/diffuse.jpg'
// import planetNormal from './textures/planet/globe/normal.jpg'
// import planetRoughness from './textures/planet/globe/roughness.jpg'
// import planetLight from './textures/planet/globe/specular.jpg'
// import cloudsTexture from './textures/planet/clouds/alpha.jpg'


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
// const planet = new THREE.Object3D()
// scene.add(planet)

// const earth = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 45, 45),
//     new THREE.MeshStandardMaterial({ 
//         map: textureLoader.load(planetTexture), 
//         normalMap: textureLoader.load(planetNormal),
//         roughnessMap: textureLoader.load(planetRoughness),
//         metalnessMap: textureLoader.load(planetRoughness)        
//     })
// )
// earth.castShadow = true
// earth.receiveShadow = true
// planet.add(earth)

// const clouds = new THREE.Mesh(
//     new THREE.SphereGeometry(1.01, 45, 45),
//     new THREE.MeshStandardMaterial({ 
//         alphaMap: textureLoader.load(cloudsTexture),
//         transparent: true 
//     })
// )
// planet.add(clouds)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0x0000FF)
// scene.add(ambientLight)
// var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// scene.add( light );
// const sunLight = new THREE.DirectionalLight(0x0000ff, 0.5)
// sunLight.position.x = 0
// sunLight.position.y = 20
// sunLight.position.z = 20
// scene.add(sunLight)
var light = new THREE.PointLight( 0x65aceb, 1, 3000 );
light.position.set( 0, 200, 0 );
scene.add( light );
// const light = new THREE.HemisphereLight(0x87ceeb, 0x000044, 1);
// scene.add(light);
// const sunLight = new THREE.DirectionalLight(0xffffff, 3)
// sunLight.position.x = 1.5
// sunLight.position.y = 1.5
// sunLight.position.z = 1.5
// sunLight.castShadow = true
// sunLight.shadow.camera.top = 1.20
// sunLight.shadow.camera.right = 1.20
// sunLight.shadow.camera.bottom = -1.20
// sunLight.shadow.camera.left = -1.20
// planet.add(sunLight)

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

    // Update house
    // earth.rotation.y += 0.001
    // clouds.rotation.y += 0.0008
    
    // Update camera
    // camera.position.x = cursor.x * 0.5
    // camera.position.y = - cursor.y * 0.5
    // camera.lookAt(new THREE.Vector3())

    // Render
    renderer.render(scene, camera)
}

loop()



// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()

// const grassTexture = textureLoader.load('grass.jpg')
// grassTexture.wrapS = THREE.RepeatWrapping
// grassTexture.wrapT = THREE.RepeatWrapping
// grassTexture.repeat.set(4, 4)

// /**
//  * House
//  */
// const house = new THREE.Object3D()
// scene.add(house)

// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(4, 4, 1, 1),
//     new THREE.MeshStandardMaterial({ map: grassTexture, metalness: 0.3, roughness: 0.8 })
// )
// floor.rotation.x = - Math.PI * 0.5
// floor.position.y = - 0.5
// floor.castShadow = true
// floor.receiveShadow = true
// house.add(floor)

// const walls = new THREE.Mesh(
//     new THREE.BoxGeometry(1.5, 1, 1.5),
//     new THREE.MeshStandardMaterial({ color: 0xffcc99, metalness: 0.3, roughness: 0.8 })
// )
// walls.castShadow = true
// walls.receiveShadow = true
// house.add(walls)

// const roof = new THREE.Mesh(
//     new THREE.ConeGeometry(1.2, 0.6, 0.04),
//     new THREE.MeshStandardMaterial({ color: 0x885522, metalness: 0.3, roughness: 0.8 })
// )
// roof.position.y += 0.8
// roof.rotation.y += Math.PI * 0.25
// roof.castShadow = true
// roof.receiveShadow = true
// house.add(roof)

// const door = new THREE.Mesh(
//     new THREE.BoxGeometry(0.02, 0.4, 0.2),
//     new THREE.MeshStandardMaterial({ color: 0xff8866, metalness: 0.3, roughness: 0.8 })
// )
// door.position.x = - 0.76
// door.position.y = - 0.3
// door.castShadow = true
// door.receiveShadow = true
// house.add(door)

// const bush1 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.1, 0.32, 0.32),
//     new THREE.MeshStandardMaterial({ color: 0x228833, metalness: 0.3, roughness: 0.8 })
// )
// bush1.position.x = - 0.8
// bush1.position.z = 0.2
// bush1.position.y = - 0.45
// bush1.castShadow = true
// bush1.receiveShadow = true
// house.add(bush1)

// const bush2 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.08, 32, 32),
//     new THREE.MeshStandardMaterial({ color: 0x228833, metalness: 0.3, roughness: 0.8 })
// )
// bush2.position.x = - 0.8
// bush2.position.z = - 0.2
// bush2.position.y = - 0.48
// bush2.castShadow = true
// bush2.receiveShadow = true
// house.add(bush2)

// /**
//  * Lights
//  */
// const doorLight = new THREE.PointLight()
// doorLight.position.x = -1.02
// doorLight.position.y = 0
// doorLight.position.z = 0
// doorLight.castShadow = true
// house.add(doorLight)

// const ambientLight = new THREE.AmbientLight(0x555555)
// scene.add(ambientLight)

// const sunLight = new THREE.DirectionalLight(0xffffff, 0.6)
// sunLight.position.x = 1
// sunLight.position.y = 1
// sunLight.position.z = 1
// sunLight.castShadow = true
// sunLight.shadow.camera.top = 1.20
// sunLight.shadow.camera.right = 1.20
// sunLight.shadow.camera.bottom = -1.20
// sunLight.shadow.camera.left = -1.20
// house.add(sunLight)


