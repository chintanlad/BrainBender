import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import quizzerRoutes from './routes/quizzerRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import events from 'events';



// import quizzerRoute from './routes/quizzerRoutes.js

dotenv.config();  // This loads environment variables from the .env file

const app = express();
const port = process.env.PORT || 5000;

events.EventEmitter.defaultMaxListeners = 15;  // Increase the limit

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());


// Route for users
app.use('/user', userRoutes);
app.use('/quiz', quizzerRoutes);
app.use('/question', questionRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Quiz Application Backend is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
