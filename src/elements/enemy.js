import phina from 'phina.js'

export default phina.define('Player', {
  superClass: 'CircleShape',
  init(options) {
    this.superInit(options)
    this.color = 'red'
    this.fill = 'gray'
    this.radius = 4
  }
})
