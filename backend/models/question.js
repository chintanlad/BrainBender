import mongoose from 'mongoose';
import Quiz from './quizzer.js';

const OptionSchema = new mongoose.Schema({
    option_text: { type: String, required: true },
    is_correct: { type: Boolean, required: true }
});

const QuestionSchema = new mongoose.Schema({
    question_id: { type: Number, required: true }, // Primary key within the quiz
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Foreign key to Quiz
    question_text: { type: String, required: true },
    question_type: { type: String, required: true },  // e.g., MCQ, Rating, etc.
    multimedia_url: { type: String },  // Optional field for images, videos
    difficulty_level: { type: Number, required: true },
    options: [OptionSchema]  // Embedding the options as an array of objects
});

// Pre-save hook to validate quiz_id
QuestionSchema.pre('save', async function (next) {
    try {
        // Check if the quiz_id exists in the Quiz collection
        const quizExists = await mongoose.model('Quiz').findById(this.quiz_id);
        if (!quizExists) {
            return next(new Error('Invalid quiz_id: Quiz does not exist'));
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;
