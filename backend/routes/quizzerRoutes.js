import express from 'express';
import Quizzer from '../models/quizzer.js'
import { createQuiz, getQuizzes, getQuizByNumber, updateQuiz, deleteQuiz } from '../controllers/quizzerController.js';

const router = express.Router();

// Create a new quiz
// {
//     "quiz_id": 1,
//     "creator_name": "drashti",
//     "title": "JavaScript Basics",
//     "description": "A quiz about fundamental concepts in JavaScript.",
//     "rating": 4.5,
//     "number":10
// }
router.post('/add', createQuiz);

// Get all quizzes
router.get('/', getQuizzes);

// Get a single quiz by quiz_number
router.get('/:quiz_number', getQuizByNumber);

// Update a quiz by quiz_number
router.put('/:quiz_number', updateQuiz);

// Delete a quiz by quiz_number
router.delete('/:quiz_number', deleteQuiz);

export default router;
