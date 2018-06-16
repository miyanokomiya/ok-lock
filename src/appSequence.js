import phina from 'phina.js'
import 'src/scenes/title'
import 'src/scenes/main'

phina.define('AppSequence', {
  superClass: 'phina.game.ManagerScene',
  init() {
    this.superInit({
      scenes: [
        {
          label: 'main',
          className: 'MainScene',
          nextLabel: 'title'
        },
        {
          label: 'title',
          className: 'TitleScene',
          nextLabel: 'main'
        }
      ]
    })
  }
})
