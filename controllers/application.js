const { Gif } = require("../models/Gif")

module.exports = {
    index: (req, res) =>{
        Gif.find({})
        .sort({ createdAt: -1})
        .populate("author")
        .then(gifs => {
            res.render("app/index", { gifs })
        })
    }
}