const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/bloglist');
const {MONGO_URI, PORT} = require('./utils/config');

mongoose.connect(MONGO_URI)
 
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})