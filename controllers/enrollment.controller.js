const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/Enrollment.model');
const Progress = require("../models/Progress.model");
const Course = require('../models/Course.model')


const enrollCourse = asyncHandler ( async (req,res) => {
    const courseId= req.params.courseId;
    const studentId = req.user.Id;

    const course = await Course.findById(courseId);
    if(!course){
        res.status(404);
        throw new Error('Course not Found');
    }


    const existingEnrollment= await Enrollment.findOne({
        student: studentId,
        course: courseId,
    })

    if(existingEnrollment){
        res.status(400);
        throw new Error('Already enrolled in this course')
    }

    const enrollment = await Enrollment.create({
        student:studentId,
        course: courseId,
    })

    await Progress.create({
        enrolllment:enrollment._id,
        completedLessons:[],
        completionPercentage:0,
    });

    res.status(201).json(enrollment);

})



const getMyEnrollments= asyncHandler (async (req,res) =>{
    const enrollments = await Enrollment.find({student: req.user.id})
        .populate({
            path:'course',
            select:"title description thumbnail instructor",
            populate:{
                path:"instructor",
                select:"name",
            },
        })
        .sort('-enrolledAt');

    res.status(200).json(enrollments);
        
});

const checkEnrollment = asyncHandler(async (req , res) =>{
    const enrollment = await Enrollment.findOne({
        student: req.user.id,
        course: req.params.courseId,
    });

    res.status(200).json({ isEnrolled: !!enrollment, enrollmentId: enrollment?._id})
}) 


module.exports= {
    enrollCourse,
    getMyEnrollments,
    checkEnrollment
}