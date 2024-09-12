import express from 'express';
import { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } from '../controllers/questionController.js';

const router = express.Router();

// Create a new question
router.post('/add', createQuestion);

// Get all questions
router.get('/', getQuestions);

// Get a single question by question_id and quiz_id
router.get('/:quiz_id/:question_id', getQuestionById);

// Update a question by question_id and quiz_id
router.put('/:quiz_id/:question_id', updateQuestion);

// Delete a question by question_id and quiz_id
router.delete('/:quiz_id/:question_id', deleteQuestion);

export default router;
