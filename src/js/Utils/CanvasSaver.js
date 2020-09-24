export default class ScreenSaver{
  constructor(_options){
    // Options
    this.canvas = _options.canvas
    this.renderer = _options.renderer
    this.camera = _options.camera
    this.scene = _options.scene
    // Set up
    document.querySelector('#screenButton').addEventListener('click', this.setScreenSave())
  }
  setScreenSave(){
    document.querySelector('#screenButton').addEventListener('click', () => {
      this.renderer.render(this.scene, this.camera.instance)
      this.canvas.toBlob(
        (blob) => {
          // this.file = this.canvas.toDataURL()
          this.title = 'Diving Experience '+new Date()
          this.formData = new FormData()
          this.formData.append('title', this.title)
          this.formData.append('experiment', blob)
          fetch('http://localhost:3001/experiment/', {
            method: 'POST',
            body: this.formData,
          }).then(res => console.log(res.text()))
        },
        'image/jpeg',
        0.95,
      )
    })
  }
}