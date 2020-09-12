const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
/**
 * properties
 */
const app = express();
app.use(bodyParser.json());
const commentsByPostId = {};

/**
 * get comments
 */
app.get("/post/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]) || [];
});
/**
 * posts comments
 */
app.post("/post/:id/comments", (req, res) => {
  const commentsId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentsId, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

/**
 * listener
 */
app.listen(4001, () => {
  console.log("listen on 4001");
});
