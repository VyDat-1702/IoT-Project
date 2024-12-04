#include <DHT.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <ArduinoJson.h>

// Cấu hình cảm biến DHT22 và các chân kết nối
#define DHT_PIN 4
#define DHT_TYPE DHT22

#define DUST_PIN 35
#define LED_DUST 25

#define MQ_PIN 34
// cấu hình cho led
#define Led1 2
#define Led2 13
#define Led3 14

// Thông tin Firebase
#define FIREBASE_HOST "https://mysmarthome-98cc4-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "BEyBTidh4Qo1FkU2IHTWBzbh9fmNhgkP6tDNzU29"


// Thông tin Wi-Fi
const char* ssid = "Dangdz";  
const char* password = "dangdangdang"; 

// Khởi tạo Firebase và cảm biến DHT
FirebaseData firebaseData;
FirebaseConfig config;
FirebaseAuth auth;

DHT dht(DHT_PIN, DHT_TYPE);

float readDustDensity() {
  digitalWrite(LED_DUST, LOW);
  delayMicroseconds(280);

  float sensorValue = analogRead(DUST_PIN);

  digitalWrite(LED_DUST, HIGH);

  delayMicroseconds(40);
  float vpd = 3.3/4095;
  float dustDensity = (sensorValue * vpd) * 0.17;
  return dustDensity;
}


void setup() {
  Serial.begin(115200);
  dht.begin();
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  pinMode(MQ_PIN, INPUT);
  pinMode(DUST_PIN, INPUT);
  pinMode(LED_DUST, OUTPUT);
  pinMode(Led1, OUTPUT);
  pinMode(Led2, OUTPUT);
  pinMode(Led3, OUTPUT);
  digitalWrite(LED_DUST, HIGH); // Ban đầu tắt LED của cảm biến bụi

  // Kết nối với Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Đang kết nối với Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nKết nối thành công!");
  Serial.print("Địa chỉ IP: ");
  Serial.println(WiFi.localIP());

  // Kết nối với Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
// ------------------------------Nhiệt Độ và Độ ẩm -----------------------------------------------------
  float temp = dht.readTemperature();
  float humi = dht.readHumidity();
  delay(2000);
  if (isnan(temp) || isnan(humi)) {
    Serial.println("Không đọc được giá trị từ cảm biến DHT.");
  } 
  else {
    Serial.print("Nhiệt độ: ");
    Serial.println(temp);
    if (Firebase.setFloat(firebaseData, "/phongkhach/nhietdo", temp)) {
      Serial.println("Cập nhật nhiệt độ thành công!");
    } 
    else {
      Serial.println("Lỗi cập nhật nhiệt độ");
    }

    Serial.print("Độ ẩm: ");
    Serial.println(humi);
    if (Firebase.setFloat(firebaseData, "/phongkhach/doam", humi)) {
      Serial.println("Cập nhật độ ẩm thành công!");
    } 
    else {
      Serial.println("Lỗi cập nhật độ ẩm");
    }
  }
// ------------------------------------Nồng Độc Co2-----------------------------------------------------
  float co2 = analogRead(MQ_PIN);
  Serial.print("Nồng độ CO2: ");
  Serial.println(co2);
  if (Firebase.setFloat(firebaseData, "/phongkhach/nongdo", co2)) {
    Serial.println("Cập nhật nồng độ CO2 thành công!");
  } 
  else {
    Serial.println("Lỗi cập nhật CO2");
  }
// ------------------------------- ĐỘ BỤI -------------------------------------------------------
  float dustDensity = readDustDensity();
  Serial.print("Độ bụi: ");
  Serial.println(dustDensity);
  if (Firebase.setFloat(firebaseData, "/phongkhach/buimin", dustDensity)) {
    Serial.println("Cập nhật độ bụi thành công!");
  } 
  else {
    Serial.println("Lỗi cập nhật độ bụi");
  }

// -------------------------------THiết BỊ 3 led ---------------------------------------------------
  if (Firebase.getString(firebaseData, "/phongkhach/den")) {
  String index = firebaseData.stringData();
  Serial.print("Giá trị lấy được là: ");
  Serial.println(index);

  // Tạo một biến JSON document
  StaticJsonDocument<200> doc; // khởi tạo một tài liệu có kích thước là 200 byte
  DeserializationError error = deserializeJson(doc, index);  //phân tích chuỗi json vừa lấy được từ firebase sau đó sẽ lưu vào doc
 // nếu phân tích bị lỗi thì sẽ lưu vào error
  if (!error) {
    const char* state_den = doc["state"]; // lấy giá trị từ biến state từ firebase lưu vào state_thiết bị
    Serial.print("State của đèn là: ");
    Serial.println(state_den);
    if (strcmp(state_den, "on") == 0) {
      digitalWrite(Led1, HIGH);  // Bật đèn
    } else if (strcmp(state_den, "off") == 0) {
      digitalWrite(Led1, LOW);   // Tắt đèn
    }
  } else {
    Serial.println("Lỗi phân tích");
  }
  } 
  else {
    Serial.println("Lỗi");
  }

  // Kiểm tra trạng thái máy lạnh
  if (Firebase.getString(firebaseData, "/phongkhach/maylanh")) {
    String index2 = firebaseData.stringData();
    Serial.print("Giá trị lấy được là: ");
    Serial.println(index2);

    StaticJsonDocument<200> doc; // khởi tạo một tài liệu có kích thước là 200 byte
    DeserializationError error = deserializeJson(doc, index2); //phân tích chuỗi json vừa lấy được từ firebase sau đó sẽ lưu vào doc
    // nếu phân tích bị lỗi thì sẽ lưu vào error

    if (!error) {
      const char* state_air = doc["state"]; // lấy giá trị từ biến state từ firebase lưu vào state_thiết bị
      Serial.print("State của máy lạnh là: ");
      Serial.println(state_air);
      if (strcmp(state_air, "on") == 0) {
        digitalWrite(Led2, HIGH);   // Bật máy lạnh
      } else if (strcmp(state_air, "off") == 0) {
        digitalWrite(Led2, LOW);  // Tắt máy lạnh
      }
    } else {
      Serial.println("Lỗi phân tích");
    }
  } else {
    Serial.println("Lỗi");
  }

  // Kiểm tra trạng thái máy lọc không khí
  if (Firebase.getString(firebaseData, "/phongkhach/maylockhongkhi")) {
    String index3 = firebaseData.stringData();
    Serial.print("Giá trị lấy được là: ");
    Serial.println(index3);

    StaticJsonDocument<200> doc; // khởi tạo một tài liệu có kích thước là 200 byte
    DeserializationError error = deserializeJson(doc, index3); //phân tích chuỗi json vừa lấy được từ firebase sau đó sẽ lưu vào doc
    // nếu phân tích bị lỗi thì sẽ lưu vào error

    if (!error) {
      const char* state_fil = doc["state"]; // lấy giá trị từ biến state từ firebase lưu vào state_thiết bị
      Serial.print("State của máy lọc không khí là: ");
      Serial.println(state_fil);
      if (strcmp(state_fil, "on") == 0) {
        digitalWrite(Led3, HIGH);   // Bật máy lọc không khí
      } else if (strcmp(state_fil, "off") == 0) {
        digitalWrite(Led3, LOW);  // Tắt máy lọc không khí
      }
    } else {
      Serial.println("Lỗi phân tích");
    }
  } else {
    Serial.println("Lỗi");
  }
  delay(2000); // Chờ 2 giây trước khi lặp lại
}
