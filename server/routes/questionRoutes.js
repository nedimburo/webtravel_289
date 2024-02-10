const express = require('express');
const router = express.Router();
const {
    createQuestion,
    getTravelQuestions,
} = require('../controllers/questionController');

router.post('/create-question', createQuestion);
router.get('/get-travel-questions/:travelId', getTravelQuestions);

module.exports=router;