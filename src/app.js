const express = require('express');
const morgan = require('morgan');

// rutas

const userRoutes = require('./routes/route.users');
const repairRoutes = require('./routes/route.repair');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

module.exports = app;
