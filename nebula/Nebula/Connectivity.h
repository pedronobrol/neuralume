#include "EEPROMManager.h"
#include <WiFi.h>
#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <Adafruit_NeoPixel.h>
#include "esp_wpa2.h" //wpa2 library for connections to Enterprise networks

//Set AP and wait for con http request
void setConfigMode(const char *ssid, const char *password);

//Try to connect to the wifi with credentials from EEPROM
//Returns true if successful
bool tryConnect(Adafruit_NeoPixel &pixels);
