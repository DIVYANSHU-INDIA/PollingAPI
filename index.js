// Import the Express library
const express = require('express');
const cors = require('cors');


// Import the function to connect with the database
const connectWithDb = require('./config/mongo');

// Create an instance of the Express application
const app = express();
app.use(cors());

// Import Swagger dependencies for API documentation
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load the Swagger document from the YAML file
const swaggerDocument = YAML.load('./swagger.yaml');

// Use Swagger UI middleware to serve API documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to the database by calling the connectWithDb function
connectWithDb();

// Apply middleware to parse incoming JSON requests
app.use(express.json());

// Apply middleware to parse incoming URL-encoded requests with extended options
app.use(express.urlencoded({ extended: true }));

// Use the express router defined in the 'routes' module
app.use('/', require('./routes'));

// Start the server and listen on port 5000
app.listen(5000, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is up and running at http://localhost:5000`);
});
