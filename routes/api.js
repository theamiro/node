const express = require("express")
const router = express.Router()

router.get("/", (request, response) => {
	response.send({status: 200, message: "He is Risen", verse: "Matthew 28:6"})
})

module.exports = router
