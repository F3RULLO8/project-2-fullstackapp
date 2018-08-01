const User = require("../models/User")
const { Gif } = require("../models/Gif")
const bcrypt = require("bcrypt-nodejs")

const createPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

User.find({}).remove(() => {
  Gif.find({}).remove(() => {
    let bugs = User.create({
      local: {
        email: "bugsbunny@gmail.com",
        password: createPassword("bugsbunny")
      }
    }).then(user => {
      Promise.all([
        Gif.create({
          content: "https://media2.giphy.com/media/QJvwBSGaoc4eI/200.webp",
          author: user._id
        }).then(gif => {
          user.gifs.push(gif)
        })
      ]).then(() => {
        user.save(err => console.log(err))
      })
    })
  })
})
