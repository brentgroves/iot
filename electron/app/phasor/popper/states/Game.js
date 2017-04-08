/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
//https://github.com/lean/phaser-es6-webpack
export default class extends Phaser.State {
  constructor ({ disp,getSt}){
    super();
    this.dispatch = disp;
    this.getState = getSt;
  }

  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom',
      dispatch: this.dispatch,
      getState: this.getState
    })

    this.game.add.existing(this.mushroom)


  }

  render () {
//    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
//    }
  }
}