const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  try {
    axios.post("http://localhost:4000/events", event);
  } catch (e) {
    console.log(e.message);
  }
  try {
    axios.post("http://localhost:4001/events", event);
  } catch (e) {
    console.log(e.message);
  }
  //   try {
  //     axios.post("http://localhost:4002/events", event);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  res.send({ status: "OK" });
});
const PORT = 4005;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
