
## How to Run the Project
The Task Planner application has two parts:

Frontend – built with React

Backend – built with Node.js, Express, MongoDB

Follow the steps below to run the application locally:

<!-- Frontend project instruction start -->
##  Clone the Repository 
git clone https://github.com/Suraj-Gurav/TaskPlanner_Application_MERN.git


## Open a new terminal and navigate to the frontend folder
cd frontend

##Install frontend dependencies
npm install

## Start the React development server
npm start

The frontend will run on: http://localhost:3000

<!-- Backend project instruction start -->
## Navigate to the backend folder
cd backend

## Install backend dependencies
npm install

## Create a .env file in the backend/ directory
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Replace your_mongodb_connection_string with your actual MongoDB connection string (from MongoDB Atlas or local MongoDB)
Replace your_jwt_secret_key with a strong secret key

## Start the backend server
npm start

The backend will run on: http://localhost:5000



## Features in this project:
User Registration and Login
Create, Read, Update, Delete (CRUD) Tasks
Task Filtering (Pending/Completed)
Search tasks by title
User-specific task management
Protected routes using JWT
