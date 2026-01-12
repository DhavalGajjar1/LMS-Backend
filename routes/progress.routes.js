const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/auth.middleware');
const { getProgress, updateProgress } = require('../controllers/progress.controller');

router.use(protect);

router.get('/:courseId',getProgress)
router.put('/:courseId/lesson/:lessonId',updateProgress)

module.exports = router