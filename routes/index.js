// Import the Express library
const express = require('express');

// Create an instance of the Express Router
const router = express.Router();

// Import the homeController to handle the home route
const homeController = require('../controllers/HomeController');

// Define a route for the home page, which triggers the 'home' method in homeController
router.get('/', homeController.home);

// Use the '/questions' route and delegate further routing to the './questions' module
router.use('/questions', require('./questions'));

// Use the '/options' route and delegate further routing to the './options' module
router.use('/options', require('./options'));

// Export the configured router to be used in other parts of the application
module.exports = router;
