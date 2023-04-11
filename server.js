const mongoose = require('mongoose');

const app = require('./app')

const {DB_HOST} = require('./config')

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful")
    app.listen(3000)
    
  })
  .catch(err => {
    console.log(err.massage)
    process.exit(1)
})


