# Smart Home System with Air Quality Monitoring and Remote Control

This smart home system uses various sensors to monitor indoor air quality and environmental conditions. It allows real-time monitoring through a web interface and enables users to remotely control appliances such as **lights**, **fans**, and **air conditioners**. Sensor data is stored in **Firebase Realtime Database**, while **ThingSpeak** is used to visualize the data with charts.

---

## 1. Hardware Components

| Component               | Function                                         |
|-------------------------|--------------------------------------------------|
| ESP32                   | Central microcontroller                          |
| CO2 Sensor MQ-2         | Measures CO2 concentration                       |
| Dust Sensor GP2Y1010AU0F| Measures PM2.5, PM10 particles                   |
| DHT22 Sensor            | Measures temperature and humidity                |
| Relay Module            | Controls fan, light, and air conditioner         |
| ThingSpeak              | Displays sensor data charts in real-time         |

---

## 2. Software Components

| Component                                    | Function                                                  |
|---------------------------------------------|-----------------------------------------------------------|
| Firebase Realtime Database                   | Stores sensor data and device states                      |
| Web App (HTML/CSS/JS + Firebase SDK)         | Frontend interface for monitoring and device control      |
| ThingSpeak                                   | Visualizes real-time sensor data using charts             |
| ESP32 Firmware (Arduino/C++)                 | Reads sensors and communicates with Firebase & ThingSpeak |

---

## 3. System Architecture

### System Block Diagram:

![System Diagram](https://github.com/user-attachments/assets/d7fc55bb-c48e-4206-938d-958a7a66d955)

### Flow Diagram:

![Flow Diagram](https://github.com/user-attachments/assets/2487edb6-16d6-440d-b098-6da1d92b638e)

---

## 4. Web Interface

The web interface provides:

- **Real-time Sensor Readings**
- **Control of Devices (Light, Fan, AC)**
- **Status Monitoring**

### Screenshots:

| Dashboard              | Control Panel         |
|------------------------|-----------------------|
| ![Dashboard](https://github.com/user-attachments/assets/d2445d38-efe2-4ff5-8983-fe1a20e41e27) | ![Control](https://github.com/user-attachments/assets/fc9338a0-b250-4d22-be4f-e7be386efe61) |

---

## 5. Firebase Realtime Database – Sample Structure

The Firebase stores sensor values and device states as shown:

![Firebase Structure](https://github.com/user-attachments/assets/e4ab27e6-562a-463d-9238-82a1e9cfe26c)

```json
{
  "sensors": {
    "temperature": 28,
    "humidity": 65,
    "co2": 500,
    "dust": 35
  },
  "devices": {
    "light": true,
    "fan": false,
    "ac": true
  }
}
