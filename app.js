const express = require("express");
const bodyParser = require("body-parser");

const aboutContent =
  "Pellentesque sodales, purus id suscipit vulputate, risus lectus porta mi, non hendrerit elit orci a justo. Nullam interdum arcu in leo aliquet viverra. Phasellus eget pretium eros. Fusce ante felis, egestas sit amet est vel, volutpat feugiat sapien. Maecenas vestibulum imperdiet gravida. Duis porttitor sagittis metus, non cursus nibh cursus in. Quisque tempor imperdiet eros eget consectetur.";
const contactContent =
  "Fusce leo leo, gravida vel luctus vel, imperdiet a ligula. Sed venenatis est ac quam faucibus consectetur. Nulla ipsum massa, porta ut ligula volutpat, elementum dapibus mi. Quisque tempor mollis mi nec malesuada. Nullam ut nisi dapibus, interdum ante suscipit, eleifend mauris. Mauris eget nibh magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sollicitudin aliquet lorem in gravida.";
let posts = [];

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server is up and running");
});

app.get("/", function (request, response) {
  response.render("home", { posts: posts });
});

app.get("/about", function (request, response) {
  response.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (request, response) {
  response.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (request, response) {
  response.render("compose");
});

app.post("/compose", function (request, response) {
  const post = {
    title: request.body.postTitle,
    post: request.body.postData,
  };
  posts.push(post);
  response.redirect("/");
});
