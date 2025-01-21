import db from '../config/connection.js';
import { User, Thought } from '../models/index.js'; // Import User and Thought models
import cleanDB from './cleanDB.js';
import { getRandomUsers, getRandomThoughts } from './data.js'; // Import helper functions
try {
    await db(); // Establish database connection
    await cleanDB(); // Clean up the database
    // Generate random users
    const users = getRandomUsers(20); // Generate 20 users
    const userData = await User.create(users); // Insert users into the database
    // Generate random thoughts
    const randomThoughts = getRandomThoughts(40);
    const thoughtData = await Thought.insertMany(randomThoughts.map((thought) => {
        const randomUser = userData[Math.floor(Math.random() * userData.length)];
        return {
            ...thought,
            username: randomUser.username, // Assign username to the thought
        };
    }));
    // Update users with their associated thoughts
    for (const thought of thoughtData) {
        await User.findOneAndUpdate({ username: thought.username }, { $push: { thoughts: thought._id } }, { new: true });
    }
    // Log out the seed data to indicate what should appear in the database
    console.table(userData);
    console.table(thoughtData);
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
