// Dependencies
var express = require("express");
var path = require("path");

// Express App
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

var tables = [
  {
    name: "test",
    phone: "0000000000",
    email: "test@test",
    id: "1",
  },
];
var waitlist = [];

// API GET routes
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

app.get("/api/clear", function (req, res) {
  tables = [];
  waitlist = [];
});

// API POST route
app.post("/api/reserve", function (req, res) {
  var newReserve = req.body;

  if (tables.length >= 5) {
    newReserve.routeName = newReserve.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReserve);

    waitlist.push(newReserve);

    res.json(newReserve);
  } else {
    newReserve.routeName = newReserve.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReserve);

    tables.push(newReserve);

    res.json(newReserve);
  }
});

// Page routes
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/reserve.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});
