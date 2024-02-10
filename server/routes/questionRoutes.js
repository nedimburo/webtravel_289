const express = require('express');
const router = express.Router();
const {
    createQuestion,
    getTravelQuestions,
    deleteQuestion,
} = require('../controllers/questionController');

router.post('/create-question', createQuestion);
router.get('/get-travel-questions/:travelId', getTravelQuestions);
router.delete('/delete-question/:questionId', deleteQuestion);

module.exports=router;