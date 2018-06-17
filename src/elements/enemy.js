import phina from 'phina.js'

export default phina.define('Enemy', {
  superClass: 'DisplayElement',
  init(options) {
    this.superInit(options)
    this.body = phina.display.CircleShape({
      color: 'red',
      fill: 'gray',
      radius: 10
    })
    this.lockedShape = phina.display
      .CircleShape({
        radius: this.radius + 5,
        fill: 'rgba(0, 0, 255, 0.5)'
      })
      .hide()
    this.maxLockUntil = 30 * 3
    this.lockedUntil = 0
    this.life = 3

    this.body.addChildTo(this)
    this.lockedShape.addChildTo(this)
  },
  update(app) {
    this.updateLock()
  },
  lockOn() {
    this.lockedUntil = this.maxLockUntil
  },
  lockOff() {
    this.lockedUntil = 0
  },
  updateLock() {
    if (this.isLocked()) {
      this.lockedShape.show()
      this.lockedShape.alpha = this.lockedUntil / this.maxLockUntil
    } else {
      this.lockedShape.hide()
    }
    this.lockedUntil = Math.max(0, this.lockedUntil - 1)
  },
  isLocked() {
    return this.lockedUntil > 0
  },
  isExist() {
    return this.life > 0
  }
})
