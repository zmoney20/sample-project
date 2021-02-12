// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const express = require('express')
const router = express.Router()

router.post('/user', (req, res) => {
    const body = req.body

  res.json({
    confirmation: 'success',
    route: 'register',
    data: body
  })
})


module.exports = router