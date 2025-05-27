const express = require('express');
const { addTask, getAllUserTask, updateTask, deleteTask } = require('../Controllers/TaskController');
const { authenticate } = require('../Middleware/authMiddleware');
const Router = express.Router();

Router.post('/', authenticate, addTask);
Router.get('/', authenticate, getAllUserTask);
Router.put('/:id', authenticate, updateTask);
Router.delete('/:id', authenticate, deleteTask);

module.exports = Router;