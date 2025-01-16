import mongoose, { Schema, model, Types } from 'mongoose';
import { formatTimestamp } from '../utils/formatTimestamp';

// Interface for Reaction
interface Reaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Interface for Thought
interface Thought {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Reaction[];
}

// Reaction Schema
const reactionSchema = new Schema<Reaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value: Date) => formatTimestamp(value),
    } as any, // Workaround for TypeScript error
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

// Thought Schema
const thoughtSchema = new Schema<Thought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value: Date) => formatTimestamp(value),
    } as any, // Workaround for TypeScript error
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function (this: { reactions: Reaction[] }) {
  return this.reactions.length;
});

// Create the Thought model
const Thought = model<Thought>('Thought', thoughtSchema);

export default Thought;
