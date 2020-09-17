require("dotenv").config();
const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// User Credentials
const user = process.env.USERID;
const password = process.env.PASSWORD;

// Database setup
mongoose.connect(
  "mongodb+srv://" + user + ":" + password + "@cluster0.mqcxw.mongodb.net/blog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
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
        pid: res._id,
      });
    } else {
      console.log(err);
    }
  });
});

app.get("/delete", function (request, response) {
  response.redirect("/");
});

app.post("/delete", function (request, response) {
  const pid = request.body.pid;
  Post.findByIdAndRemove(pid, function (err) {
    if (err) {
      console.log(err);
    }
  });
  response.redirect("/");
});
