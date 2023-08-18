const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// rutas

const userRoutes = require('./routes/route.users');
const repairRoutes = require('./routes/route.repair');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

app.use(globalErrorHandler);

module.exports = app;
