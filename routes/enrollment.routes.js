const express=require('express');
const router = express.Router();
const {enrollCourse,getMyEnrollments,checkEnrollment} = require('../controllers/enrollment.controller')
const {protect} = require('../middleware/auth.middleware');

router.use(protect);

router.get('/my-courses',getMyEnrollments);
router.post('/:courseId',enrollCourse);
router.get('/check/;courseId',checkEnrollment);

module.exports = router;
