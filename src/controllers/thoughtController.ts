import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find().sort({ createdAt: -1 });
        return res.json(thoughts);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// GET single thought by id
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        return res.json(thought);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// POST to create a new thought
export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({ thoughtText, username });
        return res.status(201).json(newThought);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

// PUT to update a thought by id
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(thought);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

// DELETE to remove a thought by id
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        // Remove the thought's associated username (if necessary)
        await User.updateMany(
            { username: thought.username },
            { $pull: { thoughts: thought._id } }
        );

        return res.json({ message: 'Thought deleted!' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
