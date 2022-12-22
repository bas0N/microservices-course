const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");

app.use(express.json());
app.use(cors());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  //return array
  res.status(200).send(comments);
});
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
