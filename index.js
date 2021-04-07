require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const debug = require("debug")("app:startup")
const helmet = require("helmet")
const morgan = require("morgan")

const app = express()

// Routes
const index = require("./routes/index")
app.use("/", index)

const api = require("./routes/api")
app.use("/api", api)

const courses = require("./routes/courses")
app.use("/api/courses", courses)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./public"))
app.use(helmet())

if (process.env.NODE_ENV === "development") {
	app.use(morgan("tiny"))
	debug("Morgan enabled...")
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))
