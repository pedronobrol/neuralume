# Wiring

Sensor SCL -> ESP32S2 PIN 9
Sensor SDA -> ESP32S2 PIN 8 
Sensor VIN -> ESP32S2 PIN 3V3
Sensor GND -> ESP32S2 PIN GND

To compile the code:
```
arduino-cli compile Nebula.ino --fqbn espressif:esp32:esp32s2
```

To upload the code:
```
arduino-cli upload Nebula --port /dev/cu.SLAB_USBtoUART --fqbn espressif:esp32:esp32s2
```

Replace the port with the suitable port. Try `ls /dev/ | grep cu` on Mac.

Install `arduino-cli` with `brew install arduino-cli` if not installed.