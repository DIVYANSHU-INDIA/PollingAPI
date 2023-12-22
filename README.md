# Polling System API

Welcome to the Polling System API! This backend API facilitates the creation of questions, addition of options to specific questions, and voting on options. Users can delete questions and options, as well as view questions along with their respective options.

## Polling System Features

- Create questions
- Add options to questions
- Delete questions
- Delete options
- Add votes to options
- View questions with all options

## Installation Guide

To get started, follow these steps:

1. Clone this repository.
2. Run `npm install` to install all dependencies.


## Usage

1. Run `npm start` to start the application.
2. Connect to the API using Postman on port 8000.

## API Endpoints

| HTTP Verbs | Endpoints                        | Action                               |
| ---------- | ---------------------------------| ------------------------------------ |
| POST       | /questions/create                | Create a new question                |
| POST       | /questions/:id/options/create    | Add options to a specific question   |
| DELETE     | /questions/:id/delete            | Delete a question                    |
| DELETE     | /options/:id/delete              | Delete an option                     |
| PUT        | /options/:id/add_vote            | Increase the vote count for an option|
| GET        | /questions/:id                   | View a question and its options      |

## Tech Stack

- NodeJS
- ExpressJS
- MongoDB
- Mongoose ODM"# PollingAPI" 
