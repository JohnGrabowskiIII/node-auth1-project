
const express = require('express')
const hash = require('bcryptjs')

const {add} = require('../users/users-model')

// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!

const {checkUsernameFree, checkUsernameExists, checkPasswordLength} = require('./auth-middleware')

const router = express.Router()

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

router.post('/register', checkUsernameFree,  checkPasswordLength, async (req, res) => {

  try {
    const hashedPass = hash.hashSync(req.body.password, 10)
    const newUser = await add({username: req.body.username, password: hashedPass})
    res.status(201).json(newUser)
  } catch(err) {
    res.status(500).json({message: "Server could not be reached at this time"})
  }
  
})

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

router.post('/login', checkUsernameExists, checkPasswordLength, async (req, res) => {
  res.status(200).json({message: '/api/auth/login post endpoint working'})
})

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

router.get('/logout', /* middleware */ (req, res) => {
  res.status(200).json({message: '/api/auth/logout get endpoint working'})
})
 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router