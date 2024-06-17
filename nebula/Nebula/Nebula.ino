#include "Connectivity.h"
#include "DataManager.h"
#include <Wire.h>

#include "SparkFun_SCD30_Arduino_Library.h" //Click here to get the library: http://librarymanager/All#SparkFun_SCD30

#ifndef SSID
#define SSID "Nebula"
#endif

#ifndef PASSWORD
#define PASSWORD "12345678"
#endif

#ifndef TOKEN
#define TOKEN "Bearer 3795c52b2d8be49dfed04f5f719c988fa20b570c"
#endif

// On the ESP32S2 SAOLA GPIO is the NeoPixel.
#define PIN 18

/* AP ssid and password for the eventuality of having to set it to
 get wifi credentials */
const char *ssid = SSID;
const char *password = PASSWORD;

const char *board_token = TOKEN;

//Your Domain name with URL path or IP address with path
const char *serverName = "http://192.168.8.109:8000/measurements";

Adafruit_NeoPixel pixels(1, PIN, NEO_GRB + NEO_KHZ800);
SCD30 airSensor;
Measurement measurement;

unsigned long lastTimeSampleRate = 0;
unsigned long lastTimeRefreshRate = 0;

unsigned long sampleInterval = 0;
unsigned long postInterval = 0;
bool enableLed = true;

StaticJsonDocument<300> doc;

int green_threshold = 700;
int yellow_threshold = 1000;
const int erase_button = 0;

void setup()
{
  Serial.begin(115200);
  EEPROM.begin(100);
  pinMode(erase_button, INPUT);
  Wire.begin();


  if (airSensor.begin() == false)
  {
    Serial.println("Air sensor not detected. Please check wiring. Freezing...");
    while (1)
      ;
  }

  //The SCD30 has data ready every two seconds
}

void loop()
{
  
  if (WiFi.status() == WL_CONNECTED)
  {
    //Get sample
    if ((millis() - lastTimeSampleRate) > sampleInterval)
    {
      if (airSensor.dataAvailable())
      {
        //Print and store sample
        Serial.print("co2(ppm):");
        measurement.co2 = airSensor.getCO2();
        Serial.print(measurement.co2);

        Serial.print(" temp(C):");
        measurement.temperature = airSensor.getTemperature();
        Serial.print(measurement.temperature, 1);

        Serial.print(" humidity(%):");
        measurement.humidity = airSensor.getHumidity();
        Serial.print(measurement.humidity, 1);
        Serial.println();

        //Turning on leds based on thresholds:
        if (enableLed)
        {
          if (measurement.co2 < green_threshold)
          {
            //GREEN
            pixels.setPixelColor(0, Adafruit_NeoPixel::Color(0, 255, 0));
            pixels.show();
          }
          else if (measurement.co2 > green_threshold && measurement.co2 < yellow_threshold)
          {
            //YELLOW
            pixels.setPixelColor(0, Adafruit_NeoPixel::Color(255, 255, 0));
            pixels.show();
          }
          else
          {
            //RED
            pixels.setPixelColor(0, Adafruit_NeoPixel::Color(255, 0, 0));
            pixels.show();
          }
        }
        else
        {
          pixels.setPixelColor(0, Adafruit_NeoPixel::Color(0, 0, 0));
          pixels.show();
        }

        lastTimeSampleRate = millis(); //Data available. Stop trying.
      }
      else
      {
        Serial.println("Waiting for new data");
        delay(500);
        //Try again
      }
    }

    //Send data
    if ((millis() - lastTimeRefreshRate) > postInterval)
    {
      if (sendData(measurement, serverName, board_token, &doc))
      {
        green_threshold = (float)doc["green_threshold"];
        yellow_threshold = (float)doc["yellow_threshold"];
        postInterval = (int)doc["post_interval"];
        sampleInterval = (int)doc["sample_interval"];
        enableLed = (bool)doc["enable_led"];
        lastTimeRefreshRate = millis();
      }
    }
  }
  else
  {
    pixels.setPixelColor(0, Adafruit_NeoPixel::Color(0, 0, 255));
    pixels.show();                 //Blue light
    setConfigMode(ssid, password); //First create an AP
    while (!tryConnect(pixels))    //TODO: check if this line gets executed synchronously. I so, add counter and restart
      ;                            //ESP after 6 attempts
  }
}
