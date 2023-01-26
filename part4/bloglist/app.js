const express = require('express')
const cors = require('cors')
const app = express();
const logger = require('./utils/logger');
const blogRouter = require('./controllers/bloglist');
const config = require('./utils/config');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGO_URI);

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
  });

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter);

module.exports = app;