// demo: CAN-BUS Shield, receive data with check mode
// send data coming to fast, such as less than 10ms, you can use this way
// loovee, 2014-6-13


#include <SPI.h>
#include "mcp_can.h"


// the cs pin of the version after v1.1 is default to D9
// v0.9b and v1.0 is default D10
const int SPI_CS_PIN = 9;
const int LED=13;
const int LED2=8;
boolean ledON=0;
MCP_CAN CAN(SPI_CS_PIN);                                    // Set CS pin
/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the Uno and
  Leonardo, it is attached to digital pin 13. If you're unsure what
  pin the on-board LED is connected to on your Arduino model, check
  the documentation at http://www.arduino.cc

  This example code is in the public domain.

  modified 8 May 2014
  by Scott Fitzgerald
 */
const int MOTOR_FORWARD =  9;      // INA of motor driver board
const int MOTOR_REVERSE =  6;      // INB of motor driver board

int MOTOR_SPEED;
int MOTOR_MIN_SPEED = 0;
int MOTOR_MAX_SPEED = 150; //can adjust to 255 for full motor speed. 

// the setup function runs once when you press reset or power the board
void setup()
{
    Serial.begin(9600);
//    Serial.begin(115200);
    pinMode(LED2,OUTPUT);
    pinMode(MOTOR_FORWARD,OUTPUT); 
    pinMode(MOTOR_REVERSE,OUTPUT); 

    while (CAN_OK != CAN.begin(CAN_500KBPS))              // init can bus : baudrate = 500k
    {
        Serial.println("CAN BUS Shield init fail");
        Serial.println(" Init CAN BUS Shield again");
        delay(100);
    }
    Serial.println("CAN BUS Shield init ok!");
}

// the loop function runs over and over again forever
void loop()
{
    unsigned char len = 0;
    unsigned char buf[8];
    MOTOR_SPEED = 0;
    analogWrite(MOTOR_FORWARD, MOTOR_SPEED);  //trigger forward pin
    digitalWrite(MOTOR_REVERSE, LOW);
    delay(5000);

    if(CAN_MSGAVAIL == CAN.checkReceive())            // check if data coming
    {
        CAN.readMsgBuf(&len, buf);    // read data,  len: data length, buf: data buf
        unsigned char canId = CAN.getCanId();
        Serial.println("-----------------------------");
        Serial.println("get data from ID: ");
        Serial.println(canId);

        if(10==canId){

          unsigned char command =  buf[0];
  
          for(int i = 0; i<len; i++)    // print the data
          {
              Serial.print(buf[i]);
              Serial.print("\t");
          }
          Serial.println();
          Serial.print("command: ");
          Serial.println(command);
  
          MOTOR_SPEED = 100;
          analogWrite(MOTOR_FORWARD, MOTOR_SPEED);  //trigger forward pin
          digitalWrite(MOTOR_REVERSE, LOW);
          delay(10000);
          MOTOR_SPEED = 250;
          analogWrite(MOTOR_FORWARD, MOTOR_SPEED);  //trigger forward pin
          delay(10000);
        }
    }
}

/*********************************************************************************************************
  END FILE
*********************************************************************************************************/
