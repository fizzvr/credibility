const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const calculatorRoutes = require('./calculator/routes');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.use('/calculate', calculatorRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
