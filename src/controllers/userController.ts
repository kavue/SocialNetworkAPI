import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ username: 1 });
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// GET single user by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


// POST to create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// PUT to update a user by id
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user with this id!' })
        }

        res.json(user)
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE to remove user by id
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }

        // Delete all thoughts associated with the user
        await Thought.deleteMany({ username: user.username });

        // Return success message
        return res.json({ message: 'User and associated thoughts deleted!' });
    } catch (error: any) {
        // Return error message
        return res.status(500).json({ message: error.message });
    }
};


