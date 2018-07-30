const { Gif, Comment } = require("../models/Gif")

module.exports = {
  show: (req, res) => {
    Gif.findOne({ _id: req.params.id })
      .populate("author")
      .exec(function(err, gif) {
        Comment.populate(gif.comments, { path: "author" }, function(
          err,
          comments
        ) {
          gif.comments = comments
          console.log(gif)
          res.render("gif/show", gif)
        })
      })
  },
  new: (req, res) => {
    res.render("gif/new")
  },
  create: (req, res) => {
    Gif.create({
      content: req.body.gif.content,
      author: req.user._id
    }).then(gif => {
      req.user.gifs.push(gif)
      req.user.save(err => {
        res.redirect(`/gif/${gif._id}`)
      })
    })
  },
  update: (req, res) => {
    let { content } = req.body
    Gif.findOne({ _id: req.params.id }).then(gif => {
      gif.comments.push({
        content,
        author: req.user._id
      })
      gif.save(err => {
        res.redirect(`/gif/${gif._id}`)
      })
    })
  },
  requireAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect("/")
    }
  }
}
