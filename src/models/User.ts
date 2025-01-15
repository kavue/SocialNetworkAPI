import { Schema, model } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  thoughts: string[];
  friends: string[];
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

export const User = model('User', userSchema);
