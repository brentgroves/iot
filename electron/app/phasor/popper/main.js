import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

export default class Game extends Phaser.Game {
  constructor (disp,getSt,myCanvas) {
    var myCanvasId =myCanvas;
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight
    if ('development'==process.env.NODE_ENV) {
        console.log(`myCanvas=${myCanvasId}`);
    }

    super(width, height, Phaser.CANVAS,myCanvasId, 'content', null);
//    super(width, height, Phaser.CANVAS, 'content', null);
//        window.game= new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)

    this.dispatch = disp;
    this.getState = getSt;

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}


//window.game = new Game()
