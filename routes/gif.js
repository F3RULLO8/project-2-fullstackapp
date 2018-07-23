const express = require("express")
const router = express.Router()
const gifController = require("../controllers/gif.js")

router.post("/", gifController.create)
router.get("/new", gifController.new)
router.get("/:id", tweetController.show)
router.get(":id", gifController.update)

module.exports = router