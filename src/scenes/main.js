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

    const player = Player({
      x: 100,
      y: 200
    }).addChildTo(this)

    // グループを作成
    var group = phina.display.DisplayElement().addChildTo(this)
    // スプライト画像をグループに追加
    Array.range(0, 360, 24).each(function(deg) {
      // 度をラジアンに変換
      var rad = Math.degToRad(deg)
      var sprite = Enemy().addChildTo(group)
      // 円周上に配置
      sprite.x = Math.cos(rad) * 160
      sprite.y = Math.sin(rad) * 160
    })
    // グループの中心を移動
    group.setPosition(320, 480)
  }
})
