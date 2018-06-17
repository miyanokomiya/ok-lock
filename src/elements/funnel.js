import phina from 'phina.js'
import NormalBullet from 'src/elements/bullets/normal'
import { getAbsPosition } from 'src/utils/points'

export default phina.define('Lock', {
  superClass: 'CircleShape',
  init(options = {}) {
    this.superInit({
      fill: 'rgba(0,0,255,0.8)',
      radius: 6,
      ...options
    })
    this.bullets = []
    this.cooldown = 1 * 30
    this.cooldownUntil = 0
  },
  update(app) {
    this.cooldownUntil = Math.max(0, this.cooldownUntil - 1)
    this.updateBullets()
  },
  moveBy(x, y) {
    this.tweener
      .wait(100)
      .moveBy(x, y)
      .play()
  },
  updateBullets() {
    this.bullets = this.bullets.filter(s => {
      if (s.existUntil > 0) {
        s.existUntil--
        return true
      } else {
        s.remove()
        return false
      }
    })
  },
  shoot(target) {
    if (this.cooldownUntil > 0) return
    this.cooldownUntil = this.cooldown
    return NormalBullet({ target, ...getAbsPosition(this) })
  }
})
