#include "Arduino.h"
#include <HTTPClient.h>
#include <ArduinoJson.h>

struct Measurement
{
  float co2;
  float temperature;
  float humidity;
};

bool sendData(Measurement measurement, const char *serverName, String board_token, StaticJsonDocument<300> *doc);