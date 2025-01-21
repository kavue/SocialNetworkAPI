import { Thought, User } from '../models/index.js';
// GET all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET single thought by id
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought); // No explicit return
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST to create a new thought
export const createThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        // Create the thought
        const thought = await Thought.create({ thoughtText, username });
        // Associate the thought with the user
        const user = await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// PUT to update a thought by id
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought); // No explicit return
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// DELETE to remove a thought by id
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        // Remove the thought's associated username (if necessary)
        await User.updateMany({ username: thought.username }, { $pull: { thoughts: thought._id } });
        res.json({ message: 'Thought deleted!' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST to create a reaction
export const addReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const reaction = req.body;
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: reaction } }, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// DELETE to remove a reaction by reactionId
export const removeReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
