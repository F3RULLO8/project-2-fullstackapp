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
          content: "eh, what's up doc?",
          author: user._id
        }).then(gif => {
          user.gifs.push(gif)
        }),
        Gif.create({
          content: "That's all, folks!",
          author: user._id
        }).then(gif => {
          user.gifs.push(gif)
        })
      ]).then(() => {
        user.save(err => console.log(err))
      })
    })

    let daffy = User.create({
      local: {
        email: "daffyduck@gmail.com",
        password: createPassword("daffyduck")
      }
    }).then(user => {
      Promise.all([
        Gif.create({
          content: "Who's this Duck Dodgers any how?",
          author: user._id
        }).then(gif => {
          user.gifs.push(gif)
        }),
        Gif.create({
          content: "You're dethpicable.",
          author: user._id
        }).then(gif => {
          user.gifs.push(gif)
        })
      ]).then(() => {
        user.save(err => console.log(err))
      })
    })

    let elmer = User.create({
      local: {
        email: "elmerfudd@gmail.com",
        password: createPassword("elmerfudd")
      }
    }).then(user => {
      Promise.all([
        Gif.create({
          content:
            "Shh. Be vewy vewy quiet. I'm hunting wabbits! Huh-huh-huh-huh!",
          author: user._id
        }).then(gif => {
          user.gifs.push(gif)
        }),

        Gif.create({
          content: "Kiww da wabbit!",
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
