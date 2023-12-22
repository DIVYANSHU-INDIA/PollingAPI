// Import the Express library
const express = require('express');

// Create an instance of the Express Router
const router = express.Router();

// Import the questionsController to handle question-related routes
const questionsController = require('../controllers/QuestionsController');

// Define a route for creating a new question
router.post('/create', questionsController.createQuestion);

// Define a route for creating options for a specific question based on the provided question ID
router.post('/:id/options/create', questionsController.createOptions);

// Define a route for deleting a question based on the provided question ID
router.delete('/:id/delete', questionsController.deleteQuestion);

// Define a route for viewing a question and its options based on the provided question ID
router.get('/:id', questionsController.viewQuestion);

// Export the configured router to be used in other parts of the application
module.exports = router;
