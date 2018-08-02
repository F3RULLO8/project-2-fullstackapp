const { Gif, Comment } = require("../models/Gif")
const User = require("../models/User")
module.exports = {
  show: (req, res) => {
    console.log('get gif: ', req.params.id)
    Gif.findOne({ _id: req.params.id })
      .populate("author")
      .populate("comments.author")
      .then(gif => {
        res.render('gif/show', gif)
      })
  },
  new: (req, res) => {
    User.find({}).then(users => {
    res.render("gif/new", { users})
    })
  },
  create: (req, res) => {
    Gif.create({
      content: req.body.gif.content,
      author: req.user._id
    }).then(gif => {
      User.findOne({ _id: req.body.author }).then(user =>{
      req.user.gifs.push(gif)
      req.user.save(err => {
        res.redirect(`/gif/${gif._id}`)
      })
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
  delete: (req, res) => {
    Gif.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.redirect("/")
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
