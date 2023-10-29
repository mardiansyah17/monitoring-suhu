
#include "DHT.h"
#define DHTPIN 7
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

#include <Arduino_JSON.h>
#include <assert.h>

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {

JSONVar data;

  delay(2000);
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  data["c"] = String(t, 2);
  data["h"] = String(h, 2);
  data["f"] =String( ((t * 9 / 5) + 32),2);
Serial.println(data);
}