
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
// TEST THIS AFTER LOGOUT
// TEST THIS AFTER LOGOUT
// TEST TEST TEST
router.post('/login', checkUsernameExists, checkPasswordLength, async (req, res) => {

  try {
    const isPassEqual = hash.compareSync(req.body.password, req.userInfo.password)
    if (isPassEqual) {
      req.session.user = req.userInfo
      res.status(200).json({message: `Welcome ${req.userInfo.username}`})
    } else {
      res.status(401).json({message: "Invalid credentials"})
    }
  } catch(err) {
    res.status(500).json({message: "Server could not be reached at this time"})
  }

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

router.get('/logout', (req, res) => {

  console.log(req.session && req.session.user ? 'true' : 'false')

  if (req.session && req.session.user) {

    req.session.destroy(err => {
      // console.log(err)
      if (err) {
        res.status(500).json({message: "Could not log out at this time"})
      } else {
        res.status(200).json({message: "logged out"})
      }

    })
  } else {
    res.status(200).json({message: "no session"})
  }

})
 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router