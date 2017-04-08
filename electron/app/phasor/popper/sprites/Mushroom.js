import Phaser from 'phaser'
export default class extends Phaser.Sprite {
	constructor ({ game, x, y, asset,dispatch,getState}) {
	super(game, x, y, asset)
	this.dispatch=dispatch;
	this.getState=getState;
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
	listener () {
	    if ('development'==process.env.NODE_ENV) {
	    	var clickCount=this.getState().Popper.clickCount;
	      	console.log(`Popper=${clickCount}`);
	    }
	    /*
	  dispatch((dispatch,getState) => {
	    var disp = dispatch;
	    var getSt = getState;
	    SQLPRIMEDB.sql1(disp,getSt);
	  });
*/
	    this.counter++;
	    this.myText.text = "You clicked " + this.counter + " times!";

	}
	update () {
		this.angle += 1
	}
}

