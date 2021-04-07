const express = require("express")
const router = express.Router()
const Joi = require("joi")
const debug = require("debug")("app:startup")
const mongoose = require("mongoose")

router.use(express.json())

mongoose
	.connect(process.env.APP_DB_URL)
	.then(() => {
		debug("Successfully connected to DB")
	})
	.catch((err) => {
		debug("Error connecting to DB", err)
	})

const courseSchema = new mongoose.Schema({
	name: {type: String, required: true},
	author: {type: String, required: true},
	tags: {type: [String], required: true},
	createdAt: {type: Date, default: Date.now},
	isPublished: {type: Boolean, required: true},
})
const Course = mongoose.model("Course", courseSchema)

router.get("/", (request, response) => {
	getCourses()
		.then((courses) => {
			response.send(courses)
		})
		.catch((error) => {
			response.send(error)
		})
})

router.get("/:id", (request, response) => {
	getCourse(request.params.id)
		.then((course) => {
			response.status(200).send(course)
		})
		.catch((error) => {
			response.status(400).send(error)
		})
})

router.post("/", (request, response) => {
	createCourse(request.body)
		.then((result) => {
			response.send(result)
		})
		.catch((error) => {
			response.send(error)
		})
})
router.patch("/:id", (request, response) => {
	updateCourse(request.params.id, request.body)
		.then((course) => {
			response.status(200).send(course)
		})
		.catch((error) => {
			response.send(error)
		})
})
router.delete("/:id", (request, response) => {
	deleteCourse(request.params.id)
		.then((course) => {
			response.status(200).send(course)
		})
		.catch((error) => {
			response.send(error)
		})
})

async function createCourse(course) {
	const {error} = validateCourse(course)
	if (error) return response.status(400).send(error.details[0].message)

	const newCourse = new Course({
		name: course.name,
		author: course.author,
		tags: course.tags,
		isPublished: course.isPublished,
	})
	const result = await newCourse.save()
	if (result) {
		return Promise.resolve(result)
	} else {
		return Promise.reject(new Error("Error"))
	}
}

async function getCourses() {
	// const pageNumber = 2
	// const pageSize = 10
	const courses = await Course.find()
		// .skip((pageNumber - 1) * pageSize)
		// .limit(pageSize)
		.select()
	if (courses.length) {
		return Promise.resolve(courses)
	} else {
		return Promise.reject(new Error("Courses not found"))
	}
}

async function getCourse(id) {
	const course = await Course.findById(id)
	if (!course) {
		return Promise.reject(new Error("Course not found"))
	}
	return Promise.resolve(course)
}

async function updateCourse(id, body) {
	const course = await Course.findByIdAndUpdate(
		id,
		{
			$set: {
				name: body.name,
				isPublished: body.isPublished,
			},
		},
		{new: true}
	)
	if (course) {
		return Promise.resolve(course)
	}
	return Promise.reject(new Error("No Results"))
}

async function deleteCourse(id) {
	const course = await Course.findByIdAndDelete(id)
	if (!course) {
		return Promise.reject(new Error("No Course Found"))
	}
	return Promise.resolve(course)
}

function validateCourse(course) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		author: Joi.string().min(3).required(),
		tags: Joi.array().required(),
		isPublished: Joi.boolean().required(),
	})
	return schema.validate(course)
}

module.exports = router
