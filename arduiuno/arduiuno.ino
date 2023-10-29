
#include "DHT.h"
#define DHTPIN 7
#define DHTTYPE DHT22

#include <Arduino_JSON.h>
#include <assert.h>

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("DHT 22 test!");
  dht.begin();
}

void loop() {

  JSONVar data;

  delay(1000);
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  data["t"] = t;
  data["h"] = h;

  Serial.println(data);
}