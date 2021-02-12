// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

const profiles = {

  emusk: {
    image: '/images/emusk.jpg',
    name: 'Elon Musk',
    company: 'Tesla',
    languages: ['English']
  },
  mperry: {
    image: '/images/mperry.jpg',
    name: 'Matthew Perry',
    company: 'Friends',
    languages: ['English']
  },
  ananda: {
    image: '/images/ananda.jpg',
    name: 'Ananda',
    company: 'Buddha',
    languages: ['Pali']
  }
}

router.get('/', (req, res) => {
  res.render('index', { text: 'This is the dynamic data. Open index.js from the routes directory to see.' })
})

router.get('/profiles', (req, res) => {
  const keys = Object.keys(profiles)
  const list = []
  keys.forEach(key => {
    list.push(profiles[key])
  })
  
  const data = {
    profiles: list,
    timestamp: req.timestamp
  }
  res.render('profiles', data)
})

router.post('/addprofile', (req, res) => {
  const body = req.body

  body['languages'] = req.body.languages.split(', ')
  profiles[body.username] = body
  res.redirect('/profile/'+body.username)

})



router.get('/query', (req, res) => {
  const name = req.query.name
  const occupation = req.query.occupation

  const data =  {
    name: name,
    occupation: occupation
  }

  res.render('profile', data)

  res.json({
    name: name
  })

})

router.get('/:path', (req, res) => {
  const path = req.params.path

  res.json({
    data: path
  })

})

router.get('/:profile/:username', (req, res) => {
  const profile = req.params.profile
  const username = req.params.username
  const currentProfile = profiles[username]

  if (currentProfile == null){
    res.json({
      confirmation: 'fail',
      message: 'Profile ' + username + ' not found'
    })
    return
  }
  const timestamp = new Date()
  currentProfile.timestamp = req.timestamp

  res.render('profile', currentProfile)
  
})

module.exports = router
