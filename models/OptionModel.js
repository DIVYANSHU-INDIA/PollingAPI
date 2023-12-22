// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema for the 'Option' model
const optionSchema = new mongoose.Schema(
  {
    // Define the 'text' field of type String, which is required
    text: {
      type: String,
      required: true,
    },
    // Define the 'votes' field of type Number, with a default value of 0
    votes: {
      type: Number,
      default: 0,
    },
    // Define the 'link_to_vote' field of type String
    link_to_vote: {
      type: String,
    },
    // Define the 'question' field of type ObjectId, referencing the 'Question' model
    // It is required, indicating that each option must belong to a question
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question', // Reference to the 'Question' model
      required: true,
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Create a Mongoose model named 'Option' based on the defined schema
const Option = mongoose.model('Option', optionSchema);

// Export the 'Option' model to be used in other parts of the application
module.exports = Option;
