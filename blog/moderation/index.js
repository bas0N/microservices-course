const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const PORT = 4003;
app.post("/events", (req, res) => {});
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
