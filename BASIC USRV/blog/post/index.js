const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
/**
 * properties
 */
const app = express();
app.use(bodyParser.json()); 
const posts = {}; 
/**
 * get posts
 */
app.get("/post", (req, res) => {
  res.send(posts);
});
/**
 * set posts
 */
app.post("/post", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});
/**
 * listener 
 */
app.listen(4000, () => {
  console.log("listen on 4000");
});
