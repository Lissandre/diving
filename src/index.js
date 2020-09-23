import './css/style.styl'
import Application from './js/Application.js'
import './js/World/Sections/IntroSection.js'

window.application = new Application({
    $canvas: document.querySelector('.js-canvas'),
    useComposer: true
})


// /**
//  * HUD
//  */
// const depthMeter = document.querySelector('#depth')
// const pressureMeter = document.querySelector('#pressure')

// /**
//  * Controls
//  */
// document.addEventListener('keypress', (e) =>
// {

//   depthMeter.innerHTML = `${(camera.position.y/2500*100).toFixed(1)}m`
//   const bar = Math.floor(camera.position.y/-2500*10)+1
//   pressureMeter.innerHTML = `${bar} bar${bar>1?'s':''}`
// })
// document.addEventListener('mousewheel', (e)=>{

//   depthMeter.innerHTML = `${(camera.position.y/2500*100).toFixed(1)}m`
//   const bar = Math.floor(camera.position.y/-2500*10)+1
//   pressureMeter.innerHTML = `${bar} bar${bar>1?'s':''}`
// })

