const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/spiphy")
mongoose.Promise = Promise
module.exports = mongoose
