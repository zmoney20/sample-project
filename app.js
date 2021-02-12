
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const express = require('express')

const app = express() // initialize app

app.use((req, res, next) => {
  const timestamp = new Date()
  req.timestamp = timestamp.toString()
  next()
})



const config = {
  views: 'views', // Set views directory
  static: 'public', // Set static assets directory
  logging: true,

}

vertex.configureApp(app, config)

// import routes
const index = require('./routes/index')
const register = require('./routes/register')

// set routes
app.use('/', index)
app.use('/register', register)

module.exports = app
