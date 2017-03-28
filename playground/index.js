var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
//var client  = mqtt.connect({ host: 'localhost', port: 1885 }) //mosquitto
var client  = mqtt.connect({ host: 'localhost', port: 1883 }) //activemq
 
client.on('connect', function () {
//  client.subscribe('gato')
  client.publish('gato', 'ledon')
  console.log('connected');
});

setTimeout(function(){
 // 	client.publish('gato', 'ledoff');
	client.end();
	console.log('goodbye');
},3000);


/*
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString())
  client.end()
})
*/