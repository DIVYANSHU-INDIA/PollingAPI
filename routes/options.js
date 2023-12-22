// Import the Express library
const express = require('express');

// Create an instance of the Express Router
const router = express.Router();

// Import the optionsController to handle option-related routes
const optionsController = require('../controllers/OptionsController');

// Define a route for deleting an option based on the provided option ID
router.delete('/:id/delete', optionsController.deleteOption);

// Define a route for adding a vote to an option based on the provided option ID
router.put('/:id/add_vote', optionsController.addVote);

// Export the configured router to be used in other parts of the application
module.exports = router;
