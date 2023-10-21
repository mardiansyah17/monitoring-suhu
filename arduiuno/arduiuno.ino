const int sensor = A1;
int tempc;
float tempf;
float vout;
float adc;

void setup()
{
  Serial.begin(9600);
  pinMode(sensor, INPUT);
}

void loop()
{
   int temp_adc_val;
  float temp_val;
  temp_adc_val = analogRead(sensor);	/* Read Temperature */
  temp_val = (temp_adc_val /1023) * 500;
  Serial.println(temp_val);
  delay(1000);
}