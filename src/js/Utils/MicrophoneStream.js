export default class Microphone{
  constructor(_options){
    // Options
    this.time = _options.time
    this.camera = _options.camera

    // Set up
    this.setup()
  }
  setup() {
    console.log('mic')
  }
}
