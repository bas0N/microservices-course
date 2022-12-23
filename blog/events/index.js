const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", () => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  res.send({ status: "OK" });
});
const PORT = 4005;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
