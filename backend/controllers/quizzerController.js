import Quiz from '../models/quizzer.js';
import User from '../models/user.js';
// import User from './user.js';


// Create a new quiz
// export const createQuiz = async (req, res) => {
//     try {
//         const { creator_name } = req.body;
//         const user = await User.findOne({ username: creator_name });
//         if (!user) {
//             return res.status(400).json({ message: 'Creator username does not exist' });
//         }
//         console.log(req.body)
//         const newQuiz = new Quiz(req.body);
//         const savedQuiz = await newQuiz.save();
//         res.status(201).json(savedQuiz);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

export const createQuiz = async (req, res) => {
    try {
        const { creator_name, title, number, description, rating } = req.body;

        // Check if the creator_name exists in the User collection
        const userExists = await User.findOne({ username: creator_name });
        if (!userExists) {
            return res.status(400).json({ message: 'Creator username does not exist' });
        }

        // Create and save the new Quiz in one step
        const newQuiz = await Quiz.create({
            creator_name,
            title,
            number,
            description,
            rating
        });

        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all quizzes
export const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('_id', 'name');
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single quiz by quiz_number
export const getQuizByNumber = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ quiz_number: req.params.quiz_number }).populate('_id', 'name');
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a quiz by quiz_number
export const updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findOneAndUpdate({ quiz_number: req.params.quiz_number }, req.body, {
            new: true,
            runValidators: true
        }).populate('_id', 'name');
        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete a quiz by quiz_number
export const deleteQuiz = async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findOneAndDelete({ quiz_number: req.params.quiz_number });
        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
