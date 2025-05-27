const express = require('express');
const mongoose = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000
const app = express();
const connectDB = require('./configDB/db')
const userRoute = require('./Routes/UserRoute');
const taskRoute = require('./Routes/TaskRoute');

app.use(express.json());
app.use(cors());

app.use('/api/auth',userRoute)
app.use('/api/task',taskRoute)


connectDB()


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))