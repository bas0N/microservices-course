const express = require("express");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const posts = {};
app.use(express.json());
app.use(cors());
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  console.log("event received:", req.body.type);
  res.send({});
});
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: { id, title },
    });
  } catch (e) {
    console.log(e.message);
  }

  res.status(200).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
