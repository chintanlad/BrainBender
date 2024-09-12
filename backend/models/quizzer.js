import mongoose from 'mongoose';
import User from './user.js'; // Ensure this path is correct

const QuizSchema = new mongoose.Schema({
    // quiz_id: { type: Number },
    creator_name: { type: String, required: true },
    title: { type: String, required: true },
    number: { type: Number, required: true }, // Number of questions
    description: { type: String, required: true },
    rating: { type: Number, required: true }
});

// Ensure creator_name exists in Users collection
QuizSchema.pre('save', async function(next) {
    try {
        const user = await User.findOne({ username: this.creator_name });
        if (!user) {
            const error = new Error('Creator username does not exist');
            next(error);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
});

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
