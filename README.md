# Social Network API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a **Social Network API** built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**. The API provides endpoints to manage a social network platform where users can create accounts, add friends, post thoughts, and react to thoughts. It also supports functionality to manage user profiles and friendships.

<a href="https://drive.google.com/file/d/1LU4P4Cc5yZoj3vyaUgkek19M2QPA6oJe/view?usp=sharing">Walkthrough Video</a>

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Routes](#api-routes)
  - [Users](#users)
  - [Thoughts](#thoughts)
  - [Reactions](#reactions)
  - [Friends](#friends)
- [Testing](#testing)
- [License](#license)

## Technologies

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Document Mapping) for MongoDB
- **Insomnia/Postman** - API testing tools

## Installation

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** 

### Steps to Set Up

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/SocialNetworkAPI.git
2. Navigate to the project directory.

3. Install the necessary dependencies:
   ```bash
   npm install
4. Set up your MongoDB database. 
5. Build the project:
   ```bash
   npm run build
5. Seed the database with sample data:
   ```bash
   npm run seed
6. Start the server:
   ```bash
   npm start
7. Open Insomnia or Postman to test the API endpoints.

## API Routes

### Users

- **GET /api/users** - Get all users
- **GET /api/users/:id** - Get a single user by ID
- **POST /api/users** - Create a new user
- **PUT /api/users/:id** - Update a user by ID
- **DELETE /api/users/:id** - Delete a user by ID

### Thoughts

- **GET /api/thoughts** - Get all thoughts
- **GET /api/thoughts/:id** - Get a single thought by ID
- **POST /api/thoughts** - Create a new thought
- **PUT /api/thoughts/:id** - Update a thought by ID
- **DELETE /api/thoughts/:id** - Delete a thought by ID

### Reactions

- **POST /api/thoughts/:thoughtId/reactions** - Add a reaction to a thought
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId** - Remove a reaction from a thought

### Friends

- **POST /api/users/:userId/friends/:friendId** - Add a friend
- **DELETE /api/users/:userId/friends/:friendId** - Remove a friend

## Testing

To test the API, you can use Insomnia or Postman to send requests to the API endpoints. You can test all the CRUD operations for users, thoughts, reactions, and friends.

## License

This project is licensed under the MIT License.
