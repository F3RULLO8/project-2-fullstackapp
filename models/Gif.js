const mongoose = require("../db/connection")
const Schema = mongoose.Schema

const Comment = new Schema({
    content: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Gif = new Schema({
    content: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [Comment]
})

module.exports = {
    Gif: mongoose.model("Gif", Gif),
    Comment: mongoose.model("Comment", Comment)
}