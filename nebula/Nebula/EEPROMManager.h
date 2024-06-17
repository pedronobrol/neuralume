#include <Arduino.h>
#include <EEPROM.h>

void writeStringToEEPROM(int addrOffset, const String &strToWrite);

String readStringFromEEPROM(int addrOffset);
