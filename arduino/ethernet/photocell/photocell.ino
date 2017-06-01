/*

OSEPP example of measured ambient light intensity from photocell .
depending on brightness, an LED brightness is changed.
more light = brighter LED.

*/
// This example uses an Arduino Uno together with
// an Ethernet Shield to connect to shiftr.io.
//
// You can check on your device after a successful
// connection here: https://shiftr.io/try.
//
// by Joël Gähwiler
// https://github.com/256dpi/arduino-mqtt

#include <Ethernet.h>
#include <MQTTClient.h>
#include <SPI.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xEC};
byte ip[] = {192,168,254,71}; // <- change to match your network


// the cs pin of the version after v1.1 is default to D9
// v0.9b and v1.0 is default D10
const int SPI_CS_PIN = 9;
const int ledHIGH    = 1;
const int ledLOW     = 0;

int photocellPin = A0;    // photocell sensor input
int ledPin = 11;      // select the pin for the LED
int photocellValue = 0;  // variable to store the value coming from the photocell val
int lastMillis = 0;

EthernetClient net;
MQTTClient client;

void setup() {
  Serial.begin(57600);
 // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }
  Serial.println("Ethernet init ok!");
  client.begin("broker.shiftr.io", net);
  connect();

}

void connect() {
  Serial.print("connecting...");
  while (!client.connect("arduino#2", "c4125e88", "a68051977e87f879")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected!");

  client.subscribe("/photocell");
  // client.unsubscribe("/example");
}


unsigned char stmp[8] = {ledHIGH,3, 3, 3, ledLOW, 5, 6, 7};


void loop() {

  client.loop();

  if (!client.connected()) {
    connect();
  }
  
  // read the value from the sensor:
  photocellValue = analogRead(photocellPin);  
  photocellValue = constrain(photocellValue, 200, 800); //adjust depending on environment.   
 
 
  // change brightness of LED depending on light intensity of photocell
  int ledbrightness = map(photocellValue, 200, 800, 0, 255);
  
  Serial.print("incoming value from photocell sensor =");
  Serial.println( photocellValue);
  analogWrite(ledPin, ledbrightness);  

  // publish a message roughly every second.
  if (millis() - lastMillis > 30000) {
    lastMillis = millis();
    client.publish("/photocell", "on");
  }


//  CAN.sendMsgBuf(15,0, 8, stmp);
//  CAN.sendMsgBuf(0x74,0, 8, stmp);

  delay(10000);
           
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  Serial.print("incoming: ");
  Serial.print(topic);
  Serial.print(" - ");
  Serial.print(payload);
  Serial.println();


}
