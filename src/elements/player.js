import phina from 'phina.js'
import Lock from 'src/elements/lock'

export default phina.define('Player', {
  superClass: 'DisplayElement',
  init(options) {
    this.superInit(options)
    this.playerImage = phina.display.CircleShape({
      color: 'black',
      fill: 'lime',
      radius: 20
    })
    this.lock = Lock()

    this.lock.addChildTo(this)
    this.playerImage.addChildTo(this)
  },
  speed: 5,
  update(app) {
    this.keyHandler(app)
  },
  keyHandler(app) {
    var key = app.keyboard
    if (key.getKey('left')) {
      this.x -= this.speed
    }
    if (key.getKey('right')) {
      this.x += this.speed
    }
    if (key.getKey('up')) {
      this.y -= this.speed
    }
    if (key.getKey('down')) {
      this.y += this.speed
    }
    if (key.getKey('space')) {
      this.lock.show()
    } else {
      this.lock.hide()
    }
  }
})
