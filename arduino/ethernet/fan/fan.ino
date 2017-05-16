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

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
byte ip[] = {192,168,254,70}; // <- change to match your network

EthernetClient net;
MQTTClient client;

unsigned long lastMillis = 0;

const int MOTOR_FORWARD =  9;      // INA of motor driver board
const int MOTOR_REVERSE =  6;      // INB of motor driver board

int MOTOR_SPEED;
int MOTOR_MIN_SPEED = 0;
int MOTOR_MAX_SPEED = 150; //can adjust to 255 for full motor speed. 

void setup() {
  pinMode(MOTOR_FORWARD,OUTPUT); 
  pinMode(MOTOR_REVERSE,OUTPUT); 

  Serial.begin(57600);

 // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }

//  Ethernet.begin(mac, ip);
//  client.begin("192.168.254.50", net);
  client.begin("broker.shiftr.io", net);
  connect();
}

void connect() {
  Serial.print("connecting...");
//  while (!client.connect("arduino", "try", "try")) {
  while (!client.connect("arduino#1", "c4125e88", "a68051977e87f879")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected!");

  client.subscribe("/fan");
  // client.unsubscribe("/example");
}

void loop() {
  client.loop();

  if (!client.connected()) {
    connect();
  }

  // publish a message roughly every second.
  if (millis() - lastMillis > 30000) {
    lastMillis = millis();
    client.publish("/fan", "on");
  }



}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  Serial.print("incoming: ");
  Serial.print(topic);
  Serial.print(" - ");
  Serial.print(payload);
  Serial.println();

  MOTOR_SPEED = 100;
  analogWrite(MOTOR_FORWARD, MOTOR_SPEED);  //trigger forward pin
  digitalWrite(MOTOR_REVERSE, LOW);
  delay(10000);

  MOTOR_SPEED = 250;
  analogWrite(MOTOR_FORWARD, MOTOR_SPEED);  //trigger forward pin
  delay(10000);

  MOTOR_SPEED = 0;
  analogWrite(MOTOR_FORWARD, MOTOR_SPEED);  //trigger forward pin
  digitalWrite(MOTOR_REVERSE, LOW);

}
