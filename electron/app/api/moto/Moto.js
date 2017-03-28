
import { remote,ipcRenderer } from 'electron';



import * as ACTION from "../../actions/moto/Const.js"
import * as PROGRESSBUTTON from "../../const/moto/ProgressButtonConst.js"
import * as MISC from "../../const/moto/Misc.js"
import mqtt     from 'mqtt';


//import * as hashLeftOuterJoin from "lodash-joins/lib/hash/hashLeftOuterJoin.js"
var _ = require('lodash');
var joins = require('lodash-joins');
var sorty    = require('sorty')
var fs = require('fs');



export async function start(disp,getSt) {
//  var that = this;
	var dispatch = disp;
	var getState = getSt;

	dispatch({ type:ACTION.SET_GO_BUTTON, goButton:PROGRESSBUTTON.LOADING });
	var client  = mqtt.connect({ host: 'localhost', port: 1883 }) //activemq

	client.on('connect', function () {
	//  client.subscribe('gato')
	client.publish('fan', 'fanon')
	console.log('connected');
	});

	setTimeout(function(){
		//   client.publish('gato', 'ledoff');
		client.end();
		console.log('goodbye');
	},3000);

	await MISC.sleep(5000);
	dispatch({ type:ACTION.SET_GO_BUTTON, goButton:PROGRESSBUTTON.READY });

	//  dispatch({ type:ACTION.SET_STATUS, status:'' });

	return;

} // start



