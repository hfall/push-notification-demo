//Express
const express = require("express");

//web-push
const webpush = require("web-push");

//body-parser
const bodyParser = require("body-parser");

//path
const path = require("path");

const env = require("node-env-file");

//using express
const app = express();

env(__dirname + "/.env");

webpush.setVapidDetails(
  "mailto:hfall@outlook.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

//using bodyparser
app.use(bodyParser.json());
//set the static path
app.use(express.static(path.join(__dirname, "client")));

// ROUTES
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/index.html"));
// });

app.post("/subscribe", (req, res) => {
  //get push subscription object from the request
  const subscription = req.body;

  //send status 201 for the request
  res.status(201).json({});

  //create paylod: specified the detals of the push notification
  const payload = JSON.stringify({ title: "Testing This Push Notification" });

  //pass the object into sendNotification fucntion and catch any error
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 3000;
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
