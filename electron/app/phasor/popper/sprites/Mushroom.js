import Phaser from 'phaser'
import * as ACTION from "../../../actions/popper/Const.js"
import * as API from '../../../api/popper/api';

export default class extends Phaser.Sprite {
	constructor ({ game, x, y, asset,dispatch,getState}) {
	super(game, x, y, asset)
	this.dispatch=dispatch;
	this.getState=getState;

	this.dispatch((disp,getSt) => {
	    var dispatch = disp;
	    var getState = getSt;
	    API.subscribe(dispatch,getState,'photocell',this.photocell.bind(this));
	});

	this.anchor.setTo(0.5)
	//  Enables all kind of input actions on this image (click, etc)
	this.inputEnabled = true;
	this.events.onInputDown.add(this.listener, this);

	this.counter=0; 
    this.myText = game.add.text(400, 280, '', { fill: '#ffffff' });
    this.myText.font = 'Bangers'
    this.myText.padding.set(10, 16)
    this.myText.fontSize = 40
    this.myText.fill = '#77BFA3'
    this.myText.smoothed = false
    this.myText.anchor.setTo(0.5)

	}
	photocell(message){
	    if ('development'==process.env.NODE_ENV) {
	      	console.log(`message=${message}`);
	    }
	    this.myText.text = "Message is " + message;

	}

	listener () {
  //  	clickCount++;
  	    this.counter++;
	    this.dispatch({ type:ACTION.SET_CLICKCOUNT, clickCount:this.counter});
    	let clickCount=this.getState().Popper.clickCount;
	    if ('development'==process.env.NODE_ENV) {
	      	console.log(`counter=${this.counter}`);
	      	console.log(`clickCount=${clickCount}`);
	    }
	    this.myText.text = "You clicked " + this.counter + " times!";
		this.dispatch((disp,getSt) => {
		    var dispatch = disp;
		    var getState = getSt;
		    API.fanStart(dispatch,getState);
		});
	}
	update () {
		this.angle += 1
	}
}

