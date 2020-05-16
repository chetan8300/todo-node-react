const express = require('express');
const app = express();
const dotenv = require('dotenv');
let cors = require('cors');

app.use(cors())

dotenv.config({ path: __dirname + '/dev.env' });

// Import Routes
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');

// Middlewares
app.use(express.json())

// Route Middleware
app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

app.listen(4000, () => { console.log('Server up and running'); });