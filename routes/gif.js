const express = require("express")
const router = express.Router()
const gifController = require("../controllers/gif.js")

router.post("/", gifController.create)
router.get("/new", gifController.new)
router.get("/:id", gifController.show)
router.get(":id", gifController.update)
router.delete("/:id", gifController.delete)

module.exports = router