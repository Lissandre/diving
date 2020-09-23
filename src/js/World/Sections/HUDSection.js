export default class HUD{
  constructor(_options){
    // Options
    this.camera = _options.camera
    this.time = _options.time

    // Set up
    this.depthMeter = document.querySelector('#depth')
    this.pressureMeter = document.querySelector('#pressure')

    this.setHUD()
  }
  setHUD(){
    this.time.on('tick', ()=>{
      this.depthMeter.innerHTML = `${(this.camera.instance.position.y/2500*100).toFixed(1)}m`
      this.pressure = Math.floor(this.camera.instance.position.y/-2500*10)+1
      this.pressureMeter.innerHTML = `${this.pressure} bar${this.pressure>1?'s':''}`
    })
  }
}