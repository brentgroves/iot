import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { remote} from 'electron';
var path = require("path");


var loaderbg=require('../../../images/popper/loader-bg.png');
var loaderbar=require('../../../images/popper/loader-bar.png');

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    var dirName=remote.app.getPath('appData');


//    console.log('dirname=' + dirName);
//    var loaderbg = path.join(dirName, '/images/popper/loader-bg.png');
//    var loaderbar = path.join(dirName, '/images/popper/loader-bar.png');
//    console.log('loaderbg=' + loaderbg);
//    console.log('loaderbar=' + loaderbar);

    this.load.image('loaderBg', loaderbg);
    this.load.image('loaderBar',loaderbar);

//    this.load.image('loaderBg', '../../images/popper/loader-bg.png')
//    this.load.image('loaderBar', '../../images/popper/loader-bar.png')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
