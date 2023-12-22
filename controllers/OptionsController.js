const Option = require('../models/OptionModel');
const Question = require('../models/QuestionModel');

/**
 * Controller function to delete an option.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.deleteOption = async (req, res) => {
  try {
    // Extract optionId from request parameters
    const optionId = req.params.id;

    // Find the option by its ID
    const option = await Option.findById(optionId);

    // If the option does not exist, return a 400 status with an error message
    if (!option) {
      return res.status(400).json({
        message: 'Option not found',
      });
    }

    // If the option has at least one vote, it cannot be deleted
    if (option.votes > 0) {
      return res.status(400).json({
        message: 'This option has at least one vote',
      });
    }

    // Find the question associated with the option
    const question = await Question.findById(option.question);

    // Remove the reference of this option from the question's options field
    await question.updateOne({ $pull: { options: optionId } });

    // Delete the option
    await Option.findByIdAndDelete(optionId);

    // Return a 200 status with a success message
    return res.status(200).json({
      success: true,
      message: 'Option deleted successfully!',
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
 * Controller function to increase the count of votes for an option.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.addVote = async (req, res) => {
  try {
    // Extract optionId from request parameters
    const optionId = req.params.id;

    // Find the option by its ID
    const option = await Option.findById(optionId);

    // If the option does not exist, return a 400 status with an error message
    if (!option) {
      return res.status(400).json({
        message: 'Option not found',
      });
    }

    // Increase the value of votes for the option by one
    option.votes += 1;

    // Save the updated option
    option.save();

    // Find the question associated with the option
    const question = await Question.findById(option.question);

    // Increase the value of totalVotes for the question by one
    question.totalVotes += 1;

    // Save the updated question
    question.save();

    // Return a 200 status with a success message and the updated option
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
