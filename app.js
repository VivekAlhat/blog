require("dotenv").config();
const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Database setup
mongoose.connect("mongodb://127.0.0.1:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const blogSchema = new mongoose.Schema({
  pTitle: {
    type: String,
    required: true,
  },
  pContent: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", blogSchema);

app.listen(3000, function () {
  console.log("Server is up and running");
});

app.get("/", function (request, response) {
  Post.find(function (err, res) {
    if (err) {
      console.log(err);
    } else {
      response.render("home", { posts: res, page: "Blog" });
    }
  });
});

app.get("/about", function (request, response) {
  response.render("about", { page: "About" });
});

app.get("/contact", function (request, response) {
  response.render("contact", { page: "Contact" });
});

app.get("/compose", function (request, response) {
  response.render("compose", { page: "Compose" });
});

app.post("/compose", function (request, response) {
  const p = new Post({
    pTitle: request.body.postTitle,
    pContent: request.body.postData,
  });
  p.save();
  response.redirect("/");
});

app.get("/posts/:postid", function (request, response) {
  const pst = request.params.postid;
  Post.findOne({ _id: mongoose.Types.ObjectId(pst) }, function (err, res) {
    if (!err) {
      response.render("post", {
        page: res.pTitle,
        title: res.pTitle,
        post: res.pContent,
      });
    } else {
      console.log(err);
    }
  });
});
