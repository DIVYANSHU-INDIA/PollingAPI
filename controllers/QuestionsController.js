const Question = require('../models/QuestionModel');
const Option = require('../models/OptionModel');

/**
 * Controller function to create a question.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.createQuestion = async (req, res) => {
  try {
    // Extract title from the request body
    const { title } = req.body;

    // If title is not provided, return a 400 status with an error message
    if (!title) {
      return res.status(400).json({
        message: 'Title is required for creating a question',
      });
    }

    // Create a new question in the database
    const question = await Question.create({
      title,
    });

    // Return a 200 status with the success message and the created question
    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log('*******', err);
    // If an error occurs, return a 500 status with an error message
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 * Controller function to create an option for a question.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.createOptions = async (req, res) => {
  try {
    // Extract questionId from request parameters and text from the request body
    const questionId = req.params.id;
    const { text } = req.body;

    // If text is not provided, return a 400 status with an error message
    if (!text) {
      return res.status(400).json({
        message: 'Text is required for creating an option',
      });
    }

    // Find the question by its ID
    const question = await Question.findById(questionId);

    // If the question does not exist, return a 400 status with an error message
    if (!question) {
      return res.status(400).json({
        message: 'Question not found!',
      });
    }

    // Create a new option for the question in the database
    const option = await Option.create({
      text,
      question,
    });

    // Create a link_to_vote using the _id of the option
    const link_to_vote = `https://localhost:5000/options/${option.id}/add_vote`;
    
    // Update the option with the created link_to_vote
    option.link_to_vote = link_to_vote;
    option.save();

    // Put a reference to the option in the question's options field
    await question.updateOne({ $push: { options: option } });

    // Return a 200 status with the success message and the created option
    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    console.log('*******', err);
    // If an error occurs, return a 500 status with an error message
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 * Controller function to delete a question and its associated options.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.deleteQuestion = async (req, res) => {
  try {
    // Extract questionId from request parameters
    const questionId = req.params.id;

    // Find the question by its ID
    const question = await Question.findById(questionId);

    // If the question does not exist, return a 400 status with an error message
    if (!question) {
      return res.status(400).json({
        message: 'Question not found',
      });
    }

    // If at least one option of the question has votes, it won't be deleted
    if (question.totalVotes > 0) {
      return res.status(400).json({
        message: 'At least one of the options has votes',
      });
    }

    // Delete all the options of the question
    await Option.deleteMany({ question: questionId });

    // Delete the question
    await Question.findByIdAndDelete(questionId);

    // Return a 200 status with the success message
    return res.status(200).json({
      success: true,
      message: 'Question and associated options deleted successfully!',
    });
  } catch (err) {
    console.log('*******', err);
    // If an error occurs, return a 500 status with an error message
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 * Controller function to view a question and its options.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.viewQuestion = async (req, res) => {
  try {
    // Extract questionId from request parameters
    const questionId = req.params.id;

    // Populate the question with all of its options
    const question = await Question.findById(questionId).populate({
      path: 'options',
      model: 'Option',
    });

    // If the question does not exist, return a 400 status with an error message
    if (!question) {
      return res.status(400).json({
        message: 'Question not found',
      });
    }

    // Return a 200 status with the success message and the populated question
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log('*******', err);
    // If an error occurs, return a 500 status with an error message
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
