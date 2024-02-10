const Question = require('../models/Question');

const createQuestion = async (req, res)=>{
    const { content, travelId, userId } = req.body;
    try {
        const newQuestion = new Question({ content, travelId, userId });
        await newQuestion.save();
        return res.status(201).json({ message: "Question created successfully", newQuestion });
    } catch (error) {
        console.error('Error creating question:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getTravelQuestions = async (req, res)=>{
    const travelId = req.params.travelId;
    try {
        const questions = await Question.find({ travelId }).populate("userId", "username");
        return res.status(200).json({ questions });
      } catch (error) {
        console.error('Error getting questions:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
}

const deleteQuestion = async (req, res)=>{
    const questionId = req.params.questionId;
    try{
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.status(200).json({ message: "Question deleted successfully", deletedQuestion });
    }catch (error) {
        console.error('Error deleting question:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={ createQuestion, getTravelQuestions, deleteQuestion };