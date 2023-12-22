// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema for the 'Question' model
const questionSchema = new mongoose.Schema(
  {
    // Define the 'title' field of type String, which is required
    title: {
      type: String,
      required: true,
    },
    // Define the 'options' field as an array of ObjectId references to 'Option' model
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
    // Define the 'totalVotes' field of type Number, with a default value of 0
    totalVotes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Create a Mongoose model named 'Question' based on the defined schema
const Question = mongoose.model('Question', questionSchema);

// Export the 'Question' model to be used in other parts of the application
module.exports = Question;
