import phina from 'phina.js'

export default phina.define('NormalBullet', {
  superClass: 'CircleShape',
  init({ target, ...options }) {
    this.superInit({
      color: 'black',
      fill: 'lime',
      radius: 4,
      ...options
    })
    this.power = 1
    this.existUntil = 5 * 30
    this.speed = 10
    this.moveVector = this.getMoveVector(target)
  },
  update() {
    this.move()
    this.updateExist()
  },
  move() {
    this.x += this.moveVector.x
    this.y += this.moveVector.y
  },
  updateExist() {
    this.existUntil = Math.max(0, this.existUntil - 1)
  },
  isExist() {
    return this.existUntil > 0
  },
  getMoveVector(to) {
    const vec = {
      x: to.x - this.x,
      y: to.y - this.y
    }
    const dist = Math.sqrt(vec.x * vec.x + vec.y * vec.y)
    if (dist > 0) {
      return {
        x: (vec.x / dist) * this.speed,
        y: (vec.y / dist) * this.speed
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
