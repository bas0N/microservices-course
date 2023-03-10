const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type == "CommentCreated") {
    const { id, content, postId, status } = req.body.data;
    console.log(posts);
    console.log({ id, content, postId });
    posts[postId].comments.push({ id, content, status });
  }
  if (type == "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return (comment.id = id);
    });
    comment.status = status;
    comment.content = content;
  }
  res.send({});
});
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
