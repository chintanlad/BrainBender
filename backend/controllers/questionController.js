import mongoose from 'mongoose';
import Question from '../models/question.js';
import Quiz from '../models/quizzer.js';  // Import the Quiz model

// Create a new question
export const createQuestion = async (req, res) => {
    try {
        let { quiz_id } = req.body;

        // Convert quiz_id to ObjectId if it's not already
        // if (!mongoose.Types.ObjectId.isValid(quiz_id)) {
        //     return res.status(400).json({ message: 'Invalid quiz_id: Not a valid ObjectId' });
        // }

        // Check if the quiz_id exists
        const quizExists = await Quiz.findById(quiz_id);
        if (!quizExists) {
            return res.status(400).json({ message: 'Quiz does not exist' });
        }

        const newQuestion = new Question(req.body);
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all questions
export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('quiz_id', 'title');  // Optionally populate quiz details
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a single question by question_id and quiz_id
export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findOne({ question_id: req.params.question_id }).populate('quiz_id', 'title');
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a question by question_id and quiz_id
export const updateQuestion = async (req, res) => {
    try {
        const { question_id, quiz_id } = req.params;
        const updatedQuestion = await Question.findOneAndUpdate({ question_id, quiz_id }, req.body, {
            new: true,
            runValidators: true
        }).populate('quiz_id', 'title');
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a question by question_id and quiz_id
export const deleteQuestion = async (req, res) => {
    try {
        const { question_id, quiz_id } = req.params;
        const deletedQuestion = await Question.findOneAndDelete({ question_id, quiz_id });
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
