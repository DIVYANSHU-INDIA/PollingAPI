/**
 * Controller function for handling the home route.
 * It sends a JSON response with a welcome message.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.home = (req, res) => {
    // Send a JSON response with a 200 status code indicating success
    res.status(200).json({
        success: true,
        greeting: 'Welcome to the API based program'
    });
};
