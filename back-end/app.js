const express = require('express')
const app = express()
const authRoute = require('./dist/route')
const cors=require('cors')
app.use(express.json())
app.use(cors())
app.use('/api/user', authRoute)


app.use('/', (req, res) => {
  res.status(500).json({ message: 'not found' })
})
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});






module.exports = app