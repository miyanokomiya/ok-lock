import phina from 'phina.js'
import Lock from 'src/elements/lock'
import Funnel from 'src/elements/funnel'

export default phina.define('Player', {
  superClass: 'DisplayElement',
  init(options) {
    this.superInit(options)
    this.body = phina.display.CircleShape({
      color: 'black',
      fill: 'lime',
      radius: 10
    })
    this.lock = Lock()
    this.funnelGroup = phina.display.DisplayElement()
    this.lockedTargets = []
    this.moveVector = { x: 0, y: 0 }

    this.lock.addChildTo(this)
    this.body.addChildTo(this)
    this.funnelGroup.addChildTo(this)
    this.addFunnels(6)
  },
  update(app) {
    this.keyHandler(app)
    this.move()
    this.decreaseSpeed()
    this.updateLocks()
  },
  move() {
    this.x += this.moveVector.x
    this.y += this.moveVector.y
    // ファンネルの追従にラグを作る
    this.funnelGroup.x = -this.moveVector.x * 3
    this.funnelGroup.y = -this.moveVector.y * 3
    // ロックサークルは前方に押し出す
    this.lock.x = this.moveVector.x * 10
    this.lock.y = this.moveVector.y * 10
  },
  decreaseSpeed() {
    const decrease = 0.5
    if (this.moveVector.x > 0) {
      this.moveVector.x = Math.max(0, this.moveVector.x - decrease)
    } else {
      this.moveVector.x = Math.min(0, this.moveVector.x + decrease)
    }
    if (this.moveVector.y > 0) {
      this.moveVector.y = Math.max(0, this.moveVector.y - decrease)
    } else {
      this.moveVector.y = Math.min(0, this.moveVector.y + decrease)
    }
  },
  addFunnels(count) {
    count = count || 1
    ;[...Array(count)].forEach(() => Funnel().addChildTo(this.funnelGroup))
    this.AdjustFunnelPositions()
  },
  AdjustFunnelPositions() {
    const funnels = this.funnelGroup.children
    funnels.forEach((f, i) => {
      const radius = 60
      const rad = ((2 * Math.PI) / funnels.length) * i
      f.moveBy(Math.cos(rad) * radius, Math.sin(rad) * radius)
    })
  },
  plusMoveVector({ x, y }) {
    this.moveVector.x += x
    this.moveVector.y += y
    const speed = Math.sqrt(x * x, y * y)
    const maxSpeed = 20
    if (speed > maxSpeed) {
      this.moveVector.x *= maxSpeed / speed
      this.moveVector.y *= maxSpeed / speed
    }
  },
  keyHandler(app) {
    var key = app.keyboard
    const vec = { x: 0, y: 0 }
    if (key.getKey('left')) {
      vec.x = -1
    }
    if (key.getKey('right')) {
      vec.x = 1
    }
    if (key.getKey('up')) {
      vec.y = -1
    }
    if (key.getKey('down')) {
      vec.y = 1
    }
    const speed = Math.sqrt(vec.x * vec.x + vec.y * vec.y)
    if (speed > 0) {
      this.plusMoveVector({ x: vec.x / speed, y: vec.y / speed })
    }

    if (key.getKey('space')) {
      this.lock.show()
    } else {
      this.lock.hide()
    }
  },
  getLockBody() {
    if (!this.lock.visible) return
    return phina.geom.Circle(
      this.x + this.lock.x,
      this.y + this.lock.y,
      this.lock.radius
    )
  },
  lockTarget(target) {
    if (target.isLocked()) {
      target.lockOn()
    } else {
      if (this.lockedTargets.length > 3) return
      target.lockOn()
      this.lockedTargets.push(target)
    }
  },
  updateLocks() {
    this.lockedTargets = this.lockedTargets.filter(t => t.isLocked())
  }
})
