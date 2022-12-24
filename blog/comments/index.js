const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
app.use(express.json());
app.use(cors());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;
  try {
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content: content,
        postId: req.params.id,
        status: "pending",
      },
    });
  } catch (e) {
    console.log(e.message);
  }
  try {
  } catch (e) {
    console.log(e.message);
  }

  //return array
  res.status(200).send(comments);
});
app.post("/events", async (req, res) => {
  console.log("event received:", req.body.type);
  const { type, data } = req.body;
  if (type == "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return (comment.id = id);
    });
    //same thing in memory
    comment.status = status;
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: { id, status, postId, content },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  res.send({});
});
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
