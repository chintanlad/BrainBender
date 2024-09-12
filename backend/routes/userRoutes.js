import express from 'express';
import User from '../models/user.js';
import { createUser, getUsers, getUserByUsername, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Create a new user
// {
//     "name": "Chintan",
//     "email": "chintan@brainbender.com",
//     "password_hash": "chintan123",
//     "otp": "123456",
//     "username": "chintan"
// }
router.post('/add', createUser);

// Get all users
router.get('/', getUsers);

// Get a single user by username
router.get('/:username', getUserByUsername);

// Update a user by username
router.put('/:username', updateUser);

// Delete a user by username
router.delete('/:username', deleteUser);

export default router;