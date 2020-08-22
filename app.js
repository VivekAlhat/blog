const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

let posts = [];

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server is up and running");
});

app.get("/", function (request, response) {
  response.render("home", { posts: posts, page: "Blog" });
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
  const post = {
    title: request.body.postTitle,
    post: request.body.postData,
  };
  posts.push(post);
  response.redirect("/");
});

app.get("/posts/:post", function (request, response) {
  const pst = _.lowerCase(request.params.post);
  posts.forEach(function (p) {
    const h = _.lowerCase(p.title);
    if (h === pst) {
      response.render("post", { page: p.title, title: p.title, post: p.post });
    }
  });
});
