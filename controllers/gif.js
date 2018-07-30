const { Gif, Comment } = require("../models/Gif");
const User = require("../models/User");

module.exports = {
  show: (req, res) => {
    Gif.findOne({ _id: req.params.id })
      .populate("author")
      .exec(function(err, gif) {
        Comment.populate(gif.comments, { path: "author" }, function(
          err,
          comments
        ) {
          gif.comments = comments;
          res.render("gif/show", gif);
        });
      });
  },
  new: (req, res) => {
    User.find({}).then(users => {
      res.render("gif/new", { users });
    });
  },
  create: (req, res) => {
    Gif.create({
      content: req.body.gif.content,
      author: req.body.author
    }).then(gif => {
      User.findOne({ _id: req.body.author }).then(user => {
        user.gifs.push(gif);
        user.save(err => {
          res.redirect(`/gif/${gif._id}`);
        });
      });
    });
  },
  update: (req, res) => {
    let { content, author } = req.body;
    Gif.findOne({ _id: req.params.id }).then(gif => {
      gif.comments.push({
        content,
        author
      });
      gif.save(err => {
        res.redirect(`/gif/${gif._id}`);
      });
    });
  }
};
