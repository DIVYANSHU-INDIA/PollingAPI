// Import the Mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Define a function to connect to the MongoDB database
const connectWithDb = () => {
  // Use the `mongoose.connect` method to establish a connection to the MongoDB database
  mongoose
    .connect('mongodb+srv://maildivyanshuupadhyay:qUUVQ5WZGHzYDt68@cluster0.5apr37h.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
    })
    .then(() => {
      // If the connection is successful, log a message to the console
      console.log(`We are connected to the Database`);
    })
    .catch((error) => {
      // If there is an error during the connection attempt, log an error message and exit the process
      console.log(`DB connection failed`);
      console.error(error);
      process.exit(1); // Exit the process with an error code (1)
    });
};

// Export the function to make it accessible to other parts of the application
module.exports = connectWithDb;
