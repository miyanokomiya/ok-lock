import phina from 'phina.js'
import 'src/init'
import 'src/appSequence'

phina.main(() => {
  var app = phina.game.GameApp()
  app.replaceScene(phina.global.AppSequence())
  app.run()
})
