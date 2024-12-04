let nhietdo, doam, nongdo, buimin;
// Hàm chung để gửi dữ liệu lên ThingSpeak
function sendDataToThingSpeak(apiKey, temperature, humidity, Co2, bui, value) {
  const url = `https://api.thingspeak.com/update?api_key=${apiKey}&field1=${temperature}&field2=${humidity}&field3=${Co2}&field4=${bui}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        console.log("Data sent to ThingSpeak");
        console.log(value);
      } else {
        console.error("Error sending data to ThingSpeak");
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}
const firebaseConfig = {
  apiKey: "AIzaSyACiqQEF_0-SUhRqJUxmFjXVu7-Xa-umSs",
  authDomain: "mysmarthome-98cc4.firebaseapp.com",
  databaseURL: "https://mysmarthome-98cc4-default-rtdb.firebaseio.com",
  projectId: "mysmarthome-98cc4",
  storageBucket: "mysmarthome-98cc4.appspot.com",
  messagingSenderId: "529053482451",
  appId: "1:529053482451:web:922687d21bea88d7c24326",
  measurementId: "G-9ETH5Q2KSD",
};

firebase.initializeApp(firebaseConfig);
const dtb = firebase.database();

function updateAndSend(room, apiKey) {
  dtb.ref(`/${room}/nhietdo`).on("value", (snapshot) => {
    nhietdo = snapshot.val();
    document.getElementById("nhietdo").innerHTML = nhietdo;
    sendDataToThingSpeak(apiKey, nhietdo, doam, nongdo, buimin, "nhietdo");
  });

  dtb.ref(`/${room}/doam`).on("value", (snapshot) => {
    doam = snapshot.val();
    document.getElementById("doam").innerHTML = doam;
    sendDataToThingSpeak(apiKey, nhietdo, doam, nongdo, buimin);
  });

  dtb.ref(`/${room}/nongdo`).on("value", (snapshot) => {
    nongdo = snapshot.val();
    document.getElementById("nongdo").innerHTML = nongdo;
    sendDataToThingSpeak(apiKey, nhietdo, doam, nongdo, buimin);
  });

  dtb.ref(`/${room}/buimin`).on("value", (snapshot) => {
    buimin = snapshot.val();
    document.getElementById("buimin").innerHTML = buimin;
    sendDataToThingSpeak(apiKey, nhietdo, doam, nongdo, buimin);
  });
}
// -----------------------------Phong Khach---------------------------//
function phongkhach() {
  document.getElementById("device_khach").style.display = "flex";
  document.getElementById("device_bep").style.display = "none";
  document.getElementById("device_ngu").style.display = "none";
  document.getElementById("cover_code").style.display = "none";
  document.getElementById("name").innerText = "Phòng Khách";
  updateAndSend("phongkhach", "2ALZV0OC9KYJP6CX");
}
// --------------------------------Phong Bep -------------------------//

function phongbep() {
  document.getElementById("device_khach").style.display = "none";
  document.getElementById("device_bep").style.display = "flex";
  document.getElementById("device_ngu").style.display = "none";
  document.getElementById("cover_code").style.display = "none";
  document.getElementById("name").innerText = "Phòng Bếp";
  updateAndSend("phongbep", "2ALZV0OC9KYJP6CX");
}
// ------------------phong ngu ------------------------
function phongngu() {
  document.getElementById("device_khach").style.display = "none";
  document.getElementById("device_bep").style.display = "none";
  document.getElementById("device_ngu").style.display = "flex";
  document.getElementById("cover_code").style.display = "none";
  document.getElementById("name").innerText = "Phòng Ngủ";
  updateAndSend("phongngu", "2ALZV0OC9KYJP6CX");
}
//---------------------di chuyen chuot vao cac anh nhiet do,do am,..thay doi thanh gif ------------
// -- anh temp --
const tem = document.getElementById("tem");
tem.addEventListener("mouseenter", function () {
  this.src = "img_gif/temperature.gif";
});
tem.addEventListener("mouseleave", function () {
  this.src = "img_gif/temperature.png";
});
// -- anh humidity ----
const hum = document.getElementById("hum");
hum.addEventListener("mouseenter", function () {
  this.src = "img_gif/humidity.gif";
});
hum.addEventListener("mouseleave", function () {
  this.src = "img_gif/humidity.png";
});
// -- anh co2 ----
const co2 = document.getElementById("co2");
co2.addEventListener("mouseenter", function () {
  this.src = "img_gif/pollution.gif";
});
co2.addEventListener("mouseleave", function () {
  this.src = "img_gif/pollution.png";
});
// -- anh buimin ----
const dust = document.getElementById("dust");
dust.addEventListener("mouseenter", function () {
  this.src = "img_gif/dust.gif";
});
dust.addEventListener("mouseleave", function () {
  this.src = "img_gif/dust.png";
});

// den bep chinh tu firebase
var dbRef_den_bep = firebase.database().ref("phongbep").child("den");
dbRef_den_bep.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const den = document.getElementById("den_bep");
  const btn1 = document.getElementById("btn1_bep");
  if (isLightOn == "on") {
    den.src = "img_gif/light-bulb.gif";
    den.alt = "On";
    btn1.style.backgroundColor = "#ffffb5";
    isOn7 = true;
  } else if (isLightOn == "off") {
    den.src = "img_gif/light-bulb.png";
    den.alt = "Off";
    btn1.style.backgroundColor = "white";
    isOn7 = false;
  }
});
// may lanh bep
var dbRef_ml_bep = firebase.database().ref("phongbep").child("maylanh");
dbRef_ml_bep.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const ml = document.getElementById("ml_bep");
  const btn2 = document.getElementById("btn2_bep");
  if (isLightOn == "on") {
    ml.src = "img_gif/air-conditioner.gif";
    ml.alt = "On";
    btn2.style.backgroundColor = "#ffffb5";
    isOn8 = true;
  } else if (isLightOn == "off") {
    ml.src = "img_gif/air-conditioner.png";
    ml.alt = "Off";
    btn2.style.backgroundColor = "white";
    isOn8 = false;
  }
});

//may loc khong khi bep

var dbRef_mlkk_bep = firebase
  .database()
  .ref("phongbep")
  .child("maylockhongkhi");
dbRef_mlkk_bep.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const mlkk = document.getElementById("mlkk_bep");
  const btn3 = document.getElementById("btn3_bep");
  if (isLightOn == "on") {
    mlkk.src = "img_gif/air-purifier.gif";
    mlkk.alt = "On";
    btn3.style.backgroundColor = "#ffffb5";
    isOn9 = true;
  } else if (isLightOn == "off") {
    mlkk.src = "img_gif/air-purifier.png";
    mlkk.alt = "Off";
    btn3.style.backgroundColor = "white";
    isOn9 = false;
  }
});

// den khach chinh tu firebase
var dbRef_den_khach = firebase.database().ref("phongkhach").child("den");
dbRef_den_khach.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const den = document.getElementById("den_khach");
  const btn1 = document.getElementById("btn1_khach");
  if (isLightOn == "on") {
    den.src = "img_gif/light-bulb.gif";
    den.alt = "On";
    btn1.style.backgroundColor = "#ffffb5";
    isOn1 = true;
  } else if (isLightOn == "off") {
    den.src = "img_gif/light-bulb.png";
    den.alt = "Off";
    btn1.style.backgroundColor = "white";
    isOn1 = false;
  }
});
// may lanh khach
var dbRef_ml_khach = firebase.database().ref("phongkhach").child("maylanh");
dbRef_ml_khach.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const ml = document.getElementById("ml_khach");
  const btn2 = document.getElementById("btn2_khach");
  if (isLightOn == "on") {
    ml.src = "img_gif/air-conditioner.gif";
    ml.alt = "On";
    btn2.style.backgroundColor = "#ffffb5";
    isOn2 = true;
  } else if (isLightOn == "off") {
    ml.src = "img_gif/air-conditioner.png";
    ml.alt = "Off";
    btn2.style.backgroundColor = "white";
    isOn2 = false;
  }
});

//may loc khong khi khach

var dbRef_mlkk_khach = firebase
  .database()
  .ref("phongkhach")
  .child("maylockhongkhi");
dbRef_mlkk_khach.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const mlkk = document.getElementById("mlkk_khach");
  const btn3 = document.getElementById("btn3_khach");
  if (isLightOn == "on") {
    mlkk.src = "img_gif/air-purifier.gif";
    mlkk.alt = "On";
    btn3.style.backgroundColor = "#ffffb5";
    isOn3 = true;
  } else if (isLightOn == "off") {
    mlkk.src = "img_gif/air-purifier.png";
    mlkk.alt = "Off";
    btn3.style.backgroundColor = "white";
    isOn3 = false;
  }
});

// -------------------------------------------------------------

// den ngu chinh tu firebase
var dbRef_den_ngu = firebase.database().ref("phongngu").child("den");
dbRef_den_ngu.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const den = document.getElementById("den_ngu");
  const btn1 = document.getElementById("btn1_ngu");
  if (isLightOn == "on") {
    den.src = "img_gif/light-bulb.gif";
    den.alt = "On";
    btn1.style.backgroundColor = "#ffffb5";
    isOn4 = true;
  } else if (isLightOn == "off") {
    den.src = "img_gif/light-bulb.png";
    den.alt = "Off";
    btn1.style.backgroundColor = "white";
    isOn4 = false;
  }
});
// may lanh ngu
var dbRef_ml_ngu = firebase.database().ref("phongngu").child("maylanh");
dbRef_ml_ngu.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const ml = document.getElementById("ml_ngu");
  const btn2 = document.getElementById("btn2_ngu");
  if (isLightOn == "on") {
    ml.src = "img_gif/air-conditioner.gif";
    ml.alt = "On";
    btn2.style.backgroundColor = "#ffffb5";
    isOn5 = true;
  } else if (isLightOn == "off") {
    ml.src = "img_gif/air-conditioner.png";
    ml.alt = "Off";
    btn2.style.backgroundColor = "white";
    isOn5 = false;
  }
});

//may loc khong khi ngu

var dbRef_mlkk_ngu = firebase
  .database()
  .ref("phongngu")
  .child("maylockhongkhi");
dbRef_mlkk_ngu.on("value", (snap) => {
  var data = snap.val();
  var isLightOn = data.state;
  console.log("Giá trị từ Firebase:", isLightOn);
  const mlkk = document.getElementById("mlkk_ngu");
  const btn3 = document.getElementById("btn3_ngu");
  if (isLightOn == "on") {
    mlkk.src = "img_gif/air-purifier.gif";
    mlkk.alt = "On";
    btn3.style.backgroundColor = "#ffffb5";
    isOn6 = true;
  } else if (isLightOn == "off") {
    mlkk.src = "img_gif/air-purifier.png";
    mlkk.alt = "Off";
    btn3.style.backgroundColor = "white";
    isOn6 = false;
  }
});
// ------------------------------------------------------------
let isOn1 = false; // khach
let isOn2 = false; // khach
let isOn3 = false; // khach
let isOn4 = false; // ngu
let isOn5 = false; // ngu
let isOn6 = false; // ngu
let isOn7 = false; // bep
let isOn8 = false; // bep
let isOn9 = false; // bep
function den_bep() {
  isOn7 = !isOn7;
  const den = document.getElementById("den_bep");
  const btn1 = document.getElementById("btn1_bep");
  if (isOn7) {
    den.src = "img_gif/light-bulb.gif";
    den.alt = "On";
    btn1.style.backgroundColor = "#ffffb5";
  } else {
    den.src = "img_gif/light-bulb.png";
    den.alt = "Off";
    btn1.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongbep")
    .child("den")
    .set({
      state: isOn7 ? "on" : "off",
    });
}
function Maylanh_bep() {
  isOn8 = !isOn8;
  const ml = document.getElementById("ml_bep");
  const btn2 = document.getElementById("btn2_bep");
  if (isOn8) {
    ml.src = "img_gif/air-conditioner.gif";
    ml.alt = "On";
    btn2.style.backgroundColor = "#bdf3f3";
  } else {
    ml.src = "img_gif/air-conditioner.png";
    ml.alt = "Off";
    btn2.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongbep")
    .child("maylanh")
    .set({
      state: isOn8 ? "on" : "off",
    });
}
function Mayloc_bep() {
  isOn9 = !isOn9;
  const mlkk = document.getElementById("mlkk_bep");
  const btn3 = document.getElementById("btn3_bep");
  if (isOn9) {
    mlkk.src = "img_gif/air-purifier.gif";
    mlkk.alt = "On";
    btn3.style.backgroundColor = "#fae4d9";
  } else {
    mlkk.src = "img_gif/air-purifier.png";
    mlkk.alt = "Off";
    btn3.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongbep")
    .child("maylockhongkhi")
    .set({
      state: isOn9 ? "on" : "off",
    });
}
// -----------------------------------------------------------
function den_khach() {
  isOn1 = !isOn1;
  const den = document.getElementById("den_khach");
  const btn1 = document.getElementById("btn1_khach");
  if (isOn1) {
    den.src = "img_gif/light-bulb.gif";
    den.alt = "On";
    btn1.style.backgroundColor = "#ffffb5";
  } else {
    den.src = "img_gif/light-bulb.png";
    den.alt = "Off";
    btn1.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongkhach")
    .child("den")
    .set({
      state: isOn1 ? "on" : "off",
    });
}
function Maylanh_khach() {
  isOn2 = !isOn2;
  const ml = document.getElementById("ml_khach");
  const btn2 = document.getElementById("btn2_khach");
  if (isOn2) {
    ml.src = "img_gif/air-conditioner.gif";
    ml.alt = "On";
    btn2.style.backgroundColor = "#bdf3f3";
  } else {
    ml.src = "img_gif/air-conditioner.png";
    ml.alt = "Off";
    btn2.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongkhach")
    .child("maylanh")
    .set({
      state: isOn2 ? "on" : "off",
    });
  return ml.alt;
}

function Mayloc_khach() {
  isOn3 = !isOn3;
  const mlkk = document.getElementById("mlkk_khach");
  const btn3 = document.getElementById("btn3_khach");
  if (isOn3) {
    mlkk.src = "img_gif/air-purifier.gif";
    mlkk.alt = "On";
    btn3.style.backgroundColor = "#fae4d9";
  } else {
    mlkk.src = "img_gif/air-purifier.png";
    mlkk.alt = "Off";
    btn3.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongkhach")
    .child("maylockhongkhi")
    .set({
      state: isOn3 ? "on" : "off",
    });
  return mlkk.alt;
}
// --------------------------------------------------------------
function den_ngu() {
  isOn4 = !isOn4;
  const den = document.getElementById("den_ngu");
  const btn1 = document.getElementById("btn1_ngu");
  if (isOn4) {
    den.src = "img_gif/light-bulb.gif";
    den.alt = "On";
    btn1.style.backgroundColor = "#ffffb5";
  } else {
    den.src = "img_gif/light-bulb.png";
    den.alt = "Off";
    btn1.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongngu")
    .child("den")
    .set({
      state: isOn4 ? "on" : "off",
    });
}
function Maylanh_ngu() {
  isOn5 = !isOn5;
  const ml = document.getElementById("ml_ngu");
  const btn2 = document.getElementById("btn2_ngu");
  if (isOn5) {
    ml.src = "img_gif/air-conditioner.gif";
    ml.alt = "On";
    btn2.style.backgroundColor = "#bdf3f3";
  } else {
    ml.src = "img_gif/air-conditioner.png";
    ml.alt = "Off";
    btn2.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongngu")
    .child("maylanh")
    .set({
      state: isOn5 ? "on" : "off",
    });
}

function Mayloc_ngu() {
  isOn6 = !isOn6;
  const mlkk = document.getElementById("mlkk_ngu");
  const btn3 = document.getElementById("btn3_ngu");
  if (isOn6) {
    mlkk.src = "img_gif/air-purifier.gif";
    mlkk.alt = "On";
    btn3.style.backgroundColor = "#fae4d9";
  } else {
    mlkk.src = "img_gif/air-purifier.png";
    mlkk.alt = "Off";
    btn3.style.backgroundColor = "white";
  }
  firebase
    .database()
    .ref("phongngu")
    .child("maylockhongkhi")
    .set({
      state: isOn6 ? "on" : "off",
    });
}
function hideAllCharts() {
  // Ẩn tất cả các biểu đồ ở cả phòng khách,ngủ và phòng bếp
  document.getElementById("nhietdo_chart").style.display = "none";
  document.getElementById("doam_chart").style.display = "none";
  document.getElementById("nongdo_chart").style.display = "none";
  document.getElementById("dobui_chart").style.display = "none";

  document.getElementById("nhietdo_chart_kitchen").style.display = "none";
  document.getElementById("doam_chart_kitchen").style.display = "none";
  document.getElementById("nongdo_chart_kitchen").style.display = "none";
  document.getElementById("dobui_chart_kitchen").style.display = "none";

  document.getElementById("nhietdo_chart_ngu").style.display = "none";
  document.getElementById("doam_chart_ngu").style.display = "none";
  document.getElementById("nongdo_chart_ngu").style.display = "none";
  document.getElementById("dobui_chart_ngu").style.display = "none";
}
function showBackground_khach(object) {
  document.getElementById("bg_overlay").style.display = "flex";
  var objectid = object.id;
  console.log(objectid);
  hideAllCharts();
  // Hiển thị biểu đồ tương ứng
  if (objectid === "nhietdo_chart_khach") {
    document.getElementById("nhietdo_chart").style.display = "block";
  } else if (objectid === "doam_chart_khach") {
    document.getElementById("doam_chart").style.display = "block";
  } else if (objectid === "nongdo_chart_khach") {
    document.getElementById("nongdo_chart").style.display = "block";
  } else if (objectid === "buimin_chart_khach") {
    document.getElementById("dobui_chart").style.display = "block";
  }
}
var objectid = 0;
function showBackground_bep(object) {
  document.getElementById("bg_overlay").style.display = "flex";
  objectid = object.id;
  console.log(objectid);
  hideAllCharts();
  if (objectid == "nhietdo_chart_bep") {
    console.log("ok");
    document.getElementById("nhietdo_chart_kitchen").style.display = "block";
  } else if (objectid == "doam_chart_bep") {
    document.getElementById("doam_chart_kitchen").style.display = "block";
  } else if (objectid == "nongdo_chart_bep") {
    document.getElementById("nongdo_chart_kitchen").style.display = "block";
  } else if (objectid == "buimin_chart_bep") {
    document.getElementById("nongdo_chart_kitchen").style.display = "block";
  }
}
function showBackground_ngu(object) {
  document.getElementById("bg_overlay").style.display = "flex";
  var objectid = object.id;
  console.log(objectid);
  hideAllCharts();
  if (objectid == "nhietdo_chart_bed") {
    document.getElementById("nhietdo_chart_ngu").style.display = "block";
  } else if (objectid == "doam_chart_bed") {
    document.getElementById("doam_chart_ngu").style.display = "block";
  } else if (objectid == "nongdoco2_chart_bed") {
    document.getElementById("nongdo_chart_ngu").style.display = "block";
  } else if (objectid == "buimin_chart_bed") {
    document.getElementById("dobui_chart_ngu").style.display = "block";
  }
}
// Hàm ẩn lớp nền
function exit_chart() {
  document.getElementById("bg_overlay").style.display = "none";
}

const thongtin = document.getElementById("thongtin");
thongtin.addEventListener("mouseenter", function () {
  this.src = "img_gif/information.gif";
});
thongtin.addEventListener("mouseleave", function () {
  this.src = "img_gif/information.png";
});
function lienhe() {
  document.getElementById("body").style.display = "none";
  document.getElementById("footer").style.display = "none";
  document.getElementById("information_footer").style.display = "flex";
  document.getElementById("out_chart").style.display = "flex";
  document.getElementById("header").style.display = "none";
  document.getElementById("feature").style.display = "flex";
}
function exit_footer() {
  document.getElementById("body").style.display = "flex";
  document.getElementById("footer").style.display = "flex";
  document.getElementById("information_footer").style.display = "none";
  document.getElementById("out_chart").style.display = "none";
  document.getElementById("header").style.display = "flex";
  document.getElementById("feature").style.display = "none";
}
// ------------------------------------------------
