const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const PORT = 4003;
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if ((type = "CommentCreated")) {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  res.send({});
});
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
