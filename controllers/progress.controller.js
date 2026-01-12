const asyncHandler = require('express-async-handler')
const Progress = require('../models/Progress.model')
const Enrollment = require('../models/Enrollment.model')
const Course = require('../models/Course.model')

const updateProgress = asyncHandler(async (req,res) => {
    const {courseId,lessonId} = req.params;
    const userId = req.user.id;

    const enrollment = await Enrollment.findOne({
        student : userId,
        course: courseId,
    });
    if(!enrollment){
        res.status(404);
        throw new Error('Enrollment not found');
    }


    const progress = await Progress.findOne({enrollment: enrollment._id});

    if(!progress.completedLessons.includes(lessonId)){
        progress.completedLessons.push(lessonId);
    }



    const course = await Course.findById(courseId);
    const totalLessons = course.lessons.length;
    const completedCount = progress.completedLessons.length;

    progress.completionPercentage = totalLessons > 0 ? (completedCount / totalLessons)*100:0;
    progress.lastAccessed = Date.now();

    await progress.save();

    res.status(200).json(progress);
});



const getProgress = asyncHandler(async (req,res) => {
    const {courseId} = req.params;
    const userId = req.user.id;


    const enrollment = await Enrollment.findOne({
        student:userId,
        course: courseId,
    });
    if(!enrollment){
        res.status(404);
        throw new Error('Enrollment not found');
    }

    const progress = await Progress.findOne({ enrollment: enrollment._id });

    res.status(200).json(progress);
});

module.exports={updateProgress,getProgress};