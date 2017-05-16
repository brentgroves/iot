/*

OSEPP example of measured ambient light intensity from photocell .
depending on brightness, an LED brightness is changed.
more light = brighter LED.

*/
// demo: CAN-BUS Shield, send data
#include <mcp_can.h>
#include <SPI.h>

// the cs pin of the version after v1.1 is default to D9
// v0.9b and v1.0 is default D10
const int SPI_CS_PIN = 9;
const int ledHIGH    = 1;
const int ledLOW     = 0;

int photocellPin = A0;    // photocell sensor input
int ledPin = 11;      // select the pin for the LED
int photocellValue = 0;  // variable to store the value coming from the photocell val

MCP_CAN CAN(SPI_CS_PIN);                                    // Set CS pin

void setup() {
  Serial.begin(9600);
  while (CAN_OK != CAN.begin(CAN_500KBPS))              // init can bus : baudrate = 500k
  {
      Serial.println("CAN BUS Shield init fail");
      Serial.println(" Init CAN BUS Shield again");
      delay(100);
  }
  Serial.println("CAN BUS Shield init ok!");

}

unsigned char stmp[8] = {ledHIGH,3, 3, 3, ledLOW, 5, 6, 7};


void loop() {
  // read the value from the sensor:
  photocellValue = analogRead(photocellPin);  
  photocellValue = constrain(photocellValue, 200, 800); //adjust depending on environment.   
 
 
  // change brightness of LED depending on light intensity of photocell
  int ledbrightness = map(photocellValue, 200, 800, 0, 255);
  
  Serial.print("incoming value from photocell sensor =");
  Serial.println( photocellValue);
  analogWrite(ledPin, ledbrightness);  

  CAN.sendMsgBuf(15,0, 8, stmp);
//  CAN.sendMsgBuf(0x74,0, 8, stmp);

  delay(10000);
           
}
