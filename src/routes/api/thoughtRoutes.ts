import { Router } from 'express';
const router = Router()
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js';

// Routes for /api/thoughts
router.route('/')
  .get(getAllThoughts) // GET all thoughts
  .post(createThought); // POST to create a new thought

// Routes for /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThoughtById) // GET a single thought by its _id
  .put(updateThought) // PUT to update a thought by its _id
  .delete(deleteThought); // DELETE to remove a thought by its _id

// Routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction) // POST to create a reaction
  .delete(removeReaction); // DELETE to remove a reaction by its reactionId

export { router as thoughtRouter };
