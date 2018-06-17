import phina from 'phina.js'
import Player from 'src/elements/Player'
import Enemy from 'src/elements/Enemy'

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init() {
    this.superInit()
    this.backgroundColor = '#ccc'
    this.label = phina.display.Label('Hello, phina.js!').addChildTo(this)
    this.label.x = this.gridX.center()
    this.label.y = this.gridY.center()
    this.label.fill = 'white'

    this.player = Player({
      x: 100,
      y: 200
    }).addChildTo(this)

    this.enemies = []
    Array.range(0, 360, 30).each(deg => {
      const rad = Math.degToRad(deg)
      this.enemies.push(
        Enemy({
          x: Math.cos(rad) * 160 + 200,
          y: Math.sin(rad) * 160 + 200
        }).addChildTo(this)
      )
    })

    this.playerBullets = []
  },
  update() {
    this.updateLockOnEnemies()
    this.updatePlayerBullets()
  },
  updateLockOnEnemies() {
    const lockBody = this.player.getLockBody()
    if (!lockBody) return
    this.enemies.forEach(enemy => {
      const enemyBody = phina.geom.Circle(enemy.x, enemy.y, enemy.body.radius)
      if (phina.geom.Collision.testCircleCircle(lockBody, enemyBody)) {
        this.player.lockTarget(enemy)
      }
    })
  },
  updatePlayerBullets() {
    const player = this.player
    player.lockedTargets.forEach((target, i) => {
      const bullet = player.funnelGroup.children[i].shoot(target)
      if (!bullet) return
      this.playerBullets.push(bullet.addChildTo(this))
    })

    // 弾衝突
    this.playerBullets.forEach(b => {
      this.enemies.forEach(e => {
        if (phina.geom.Collision.testCircleCircle(b, e)) {
          e.life -= b.power
          b.existUntil = 0
        }
      })
    })

    // 敵消滅
    this.enemies = this.enemies.filter(e => {
      if (e.isExist()) {
        return true
      }
      e.lockOff()
      e.remove()
      return false
    })

    // 弾消滅
    this.playerBullets = this.playerBullets.filter(b => {
      if (b.isExist()) {
        return true
      }
      b.remove()
      return false
    })
  }
})
