const asyncHandler = require('express-async-handler');
const Course = require("../models/Course.model");

const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({ published: true });
    res.status(200).json(courses);
});

const getCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    res.status(200).json(course);

});

const createCourse = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please add title and description');
    }
    const course = await Course.create({
        title,
        description,
        instructor: req.user.id,
    });
    res.status(201).json(course);
})

const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not Found');
    }

    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to update this course');
    }
    const updateCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updateCourse);
});

const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(400);
        throw new Error('Not authorized to delete this course')

    }
    await course.deleteOne();

    res.status(200).json({ id: req.params.id });

});

const addLesson = asyncHandler(async (req, res) => {
    const { title, videoUrl, duration, content } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('course not found');
    }
    if (course.instructor.toString() !== req.user.id && req.user.role !== "admin") {
        res.status(401);
        throw new Error('Not authorized to add lessons to this course');
    }

    const lesson = { title, videoUrl, duration, content };
    course.lesson.push(lesson);
    await course.save();

    res.status(201).json(course);

})

module.exports = {
    getCourse,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    addLesson
}
