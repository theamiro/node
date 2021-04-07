const express = require("express")
const router = express.Router()

router.get("/", (request, response) => {
	response.send("If you can see this then it is too late.")
})

module.exports = router
