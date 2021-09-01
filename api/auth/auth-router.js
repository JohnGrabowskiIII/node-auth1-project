
const express = require('express')

// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!

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

router.post('/register', /* middleware */ (req, res) => {
  console.log('in /api/auth/register post')
  res.status(200).json({message: '/api/auth/register post endpoint working'})
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

router.post('/login', /* middleware */ (req, res) => {
  console.log('in /api/auth/login post')
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
  console.log('in /api/auth/logout get')
  res.status(200).json({message: '/api/auth/logout get endpoint working'})
})
 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router