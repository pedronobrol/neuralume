#include "Connectivity.h"

#ifndef MAX_SSID_SIZE
#define MAX_SSID_SIZE 32
#endif

#ifndef MAX_PSWD_SIZE
#define MAX_PSWD_SIZE 63
#endif

#ifndef MAX_CONNECT_TRIES
#define MAX_CONNECT_TRIES 20
#endif

struct credentials
{
  bool isEnterprise;
  String ssid;
  String eap_anonymous_identity;
  String eap_identity;
  String password;
};

AsyncWebServer server(80); // Creating WebServer at port 80

bool writeCredentialsToEEPROM(String ssid, String password)
{
  if (ssid.length() < MAX_SSID_SIZE && password.length() < MAX_PSWD_SIZE)
  {
    EEPROM.put(0, 'p'); //Personal
    writeStringToEEPROM(1, ssid);
    writeStringToEEPROM(ssid.length() + 2, password);
    EEPROM.commit();
    Serial.println("Credentials saved to EEPROM.");
    Serial.println(ssid);
    Serial.println(password);
    return true;
  }
  return false;
}

bool writeCredentialsToEEPROM(String ssid, String eap_anonymous_identity, String eap_identity, String eap_password)
{
  if (ssid.length() < MAX_SSID_SIZE && eap_password.length() < MAX_PSWD_SIZE)
  {
    int pos = 0;
    EEPROM.put(pos, 'e'); //Enterprise
    pos++;
    writeStringToEEPROM(pos, ssid);
    pos += ssid.length() + 1;
    writeStringToEEPROM(pos, eap_anonymous_identity);
    pos += eap_anonymous_identity.length() + 1;
    writeStringToEEPROM(pos, eap_identity);
    pos += eap_identity.length() + 1;
    writeStringToEEPROM(pos, eap_password);
    EEPROM.commit();
    Serial.println("Credentials saved to EEPROM.");
    Serial.println(ssid);
    Serial.println(eap_anonymous_identity);
    Serial.println(eap_identity);
    Serial.println(eap_password);
    return true;
  }
  return false;
}

void setConfigMode(const char *ssid, const char *password)
{
  //Set access point
  WiFi.softAP(ssid, password); //It gets initialised to the default IPAddress: 192.168.4.1
                               // It can be configured with WiFi.softAPConfig(local_ip, gateway, subnet);
  Serial.println("AP initialised.");
  delay(100); //Wait some time so that it can get initialised properly
  //Listen:
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    int paramsNr = request->params();
    if (paramsNr == 2)
    {
      //It is recommended (but not required) to use the following pattern:
      //http://192.168.4.1/?ssid={SSID}&password={PASSWORD}
      AsyncWebParameter *p1 = request->getParam(0); //Get first parameter
      AsyncWebParameter *p2 = request->getParam(1); //Get second parameter

      String ssid = p1->value();
      String password = p2->value();

      Serial.println(ssid);
      Serial.println(password);

      if (writeCredentialsToEEPROM(ssid, password))
      {
        request->send(200, "text/plain", "Ok"); //Offer feedback
        ESP.restart();                          //This way we can prevent concurrency issues
      }
      else
      {
        request->send(400, "text/plain", "Error: Invalid ssid or password length.");
      }
    }
    else
    {
      request->send(400, "text/plain", "Error: Invalid number of parameters exception.");
    }
  });

  server.on("/verify", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", "OK");
  });

  server.on("/enterprise", HTTP_GET, [](AsyncWebServerRequest *request) {
    int paramsNr = request->params();
    if (paramsNr == 4)
    {
      //It is recommended (but not required) to use the following pattern:
      //http://192.168.4.1/?ssid={SSID}&EAP_ANONYMOUS_IDENTITY={anonymous@example.com
      //}&EAP_IDENTITY={"nickname@example.com"}&EAP_PASSWORD={password}
      AsyncWebParameter *p1 = request->getParam(0); //Get first parameter
      AsyncWebParameter *p2 = request->getParam(1); //Get second parameter
      AsyncWebParameter *p3 = request->getParam(2); //Get second parameter
      AsyncWebParameter *p4 = request->getParam(3); //Get second parameter

      String ssid = p1->value();
      String eap_anonymous_identity = p2->value();
      String eap_identity = p3->value();
      String eap_password = p4->value();

      Serial.println(ssid);
      Serial.println(eap_anonymous_identity);
      Serial.println(eap_identity);
      Serial.println(eap_password);

      if (writeCredentialsToEEPROM(ssid, eap_anonymous_identity, eap_identity, eap_password))
      {
        request->send(200, "text/plain", "Ok"); //Offer feedback
        ESP.restart();                          //This way we can prevent concurrency issues
      }
      else
      {
        request->send(400, "text/plain", "Error: Invalid ssid or password length.");
      }
    }
    else
    {
      request->send(400, "text/plain", "Error: Invalid number of parameters exception.");
    }
  });

  server.begin(); //Start server
}

void loadingWifiMessage(Adafruit_NeoPixel &pixels)
{
  delay(500);
  Serial.println(WiFi.scanNetworks());
  Serial.println("Establishing connection to WiFi...");
  Serial.println(WiFi.status());
  delay(1000);
}

bool readCredentialsFromEEPROM(credentials &c)
{
  char type;
  int pos = 0;
  EEPROM.get(pos, type);
  pos++;
  if (type == 'p')
  {
    c.isEnterprise = false;
    c.ssid = readStringFromEEPROM(pos);
    pos += c.ssid.length() + 1;
    if (c.ssid && c.ssid.length() < MAX_SSID_SIZE)
    {
      c.password = readStringFromEEPROM(pos);
      return true;
    }
    return false;
  }
  else if (type == 'e')
  {
    c.isEnterprise = true;
    c.ssid = readStringFromEEPROM(pos);
    pos += c.ssid.length() + 1;
    if (c.ssid && c.ssid.length() < MAX_SSID_SIZE)
    {
      c.eap_anonymous_identity = readStringFromEEPROM(pos);
      pos += c.eap_anonymous_identity.length() + 1;
      c.eap_identity = readStringFromEEPROM(pos);
      pos += c.eap_identity.length() + 1;
      c.password = readStringFromEEPROM(pos);
      return true;
    }
    return false;
  }
  else
  {
    return false;
  }
}

bool tryConnect(Adafruit_NeoPixel &pixels)
{
  credentials c; //Capturamos los datos


  if (readCredentialsFromEEPROM(c))
  { 
    Serial.println("Connecting to wifi (data from EEPROM");
    WiFi.scanNetworks();
    
    if (c.isEnterprise){
      esp_wifi_sta_wpa2_ent_set_identity((uint8_t *)c.eap_anonymous_identity.c_str(), c.eap_anonymous_identity.length()); 
      esp_wifi_sta_wpa2_ent_set_username((uint8_t *)c.eap_identity.c_str(), c.eap_identity.length());
      esp_wifi_sta_wpa2_ent_set_password((uint8_t *)c.password.c_str(), c.password.length());
      esp_wifi_sta_wpa2_ent_enable(); //set config settings to enable function
      WiFi.begin(c.ssid.c_str()); //connect to wifi
    } 
    else {
      Serial.println("Personal network");
      WiFi.begin(c.ssid.c_str(), c.password.c_str());
      Serial.println(c.ssid);
      Serial.println(c.password);
    }
    for (int i = 0; i < MAX_CONNECT_TRIES; i++)
    {
      if (WiFi.status() == WL_CONNECTED)
      {
        Serial.println("Connected!!");
        server.end();                //End server
        WiFi.softAPdisconnect(true); // Close AP
        return true;
      }
      loadingWifiMessage(pixels);
    }

    return false; //Max tries exceeded. Try again.
  }
  else
  {
    Serial.println("Invalid EEPROM credentials");
    while (true)
      ; //EEPROM not inisialised. Wait for configuration
    //return false;
  }
}
