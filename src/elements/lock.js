import phina from 'phina.js'

export default phina.define('Lock', {
  superClass: 'PolygonShape',
  init(options = {}) {
    this.superInit({
      sides: 12,
      fill: 'rgba(0,0,255,0.2)',
      radius: 10,
      ...options
    })
  },
  update(app) {
    if (this.visible) {
      this.rotation += 2
      this.radius = Math.min(64, this.radius + 8)
    } else {
      this.radius = 32
    }
  }
})
