const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const User = new Schema({
  local: {
    email: String,
    password: String
  },
  gifs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gif"
    }
  ]
});

module.exports = mongoose.model("User", User);
