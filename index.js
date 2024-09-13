const express = require("express");
const app = express();
const Post = require("./models/Post");

const db = require("./config/db");

const port = process.env.PORT || 3000;

app.use(express.json());

db()
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

// To check if server is running
app.get("/api/", (req, res) => {
  res.status(200).json({ Message: "Welcome to my blog" });
});

//Fetching all the post
app.get("/api/posts", (req, res) => {
  Post.find({})
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.get("/api/users", (req, res) => {
  Post.find({})
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

//Fetching a single post
app.get("/api/posts/:id", (req, res) => {
  let postId = req.params.id;
  Post.find({ _id: postId })
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {});
});

//Creating a new post
app.post("/api/posts/", (req, res) => {
  let newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  newPost
    .save()
    .then((data) => {
      res
        .status(200)
        .json({ message: "Post Created successfully ", data: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.post("/api/users/", (req, res) => {
  let newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  newPost
    .save()
    .then((data) => {
      res
        .status(200)
        .json({ message: "Post Created successfully ", data: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//Updating a specific post
app.put("/api/posts/:id", (req, res) => {
  let postId = req.params.id;
  let newInfo = {
    title: req.body.title,
    description: req.body.description,
  };

  Post.findByIdAndUpdate(postId, newInfo)
    .then((data) => {
      res
        .status(200)
        .json({ message: "Post updated successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//Deleting a specific post
app.delete("/api/posts/:id", (req, res) => {
  let postId = req.params.id;

  Post.findByIdAndDelete(postId)
    .then(() => {
      res.status(200).json({ message: "Post Deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
app.listen(port, (err) => {
  if (!err) {
    console.log(`server is running on port http://localhost:${port}`);
  }
});
