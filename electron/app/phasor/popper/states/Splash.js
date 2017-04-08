import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import { remote} from 'electron';
var path = require("path");
var mushroom2=require('../../../images/popper/mushroom2.png');

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
//    var dirName=remote.app.getPath('appData');
//    console.log('dirname=' + dirName);
//    var mushroom2 = path.join(dirName, '/images/popper/mushroom2.png');
//    console.log('mushroom2=' + mushroom2);

    this.load.image('mushroom',mushroom2);
  }

  create () {
    this.state.start('Game')
  }
}
