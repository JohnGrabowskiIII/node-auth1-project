const {find, findBy, findById, add} = require('../users/users-model')

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {

}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {

  // TEST
  console.log('in checkUnFree middleware')

  const {username} = req.body

  try {
    const rows = await findBy({username: username})
    if (!rows.length) {
      next()
    } else {
      res.status(422).json({message: "Username taken"})
    }
  } catch(err) {
    res.status(500).json({message: "Server could not be reached at this time"})
  }

}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {

  // TEST
  console.log('in checkUnExist middleware')

  const {username} = req.body

  try {
    const rows = await findBy({username: username})
    if (rows.length) {
      req.userInfo = rows[0]
      next()
    } else {
      res.status(401).json({message: "Invalid credentials"})
    }
  } catch(err) {
    res.status(500).json({message: "Server could not be reached at this time"})
  }

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {

  // TEST
  console.log('in checkPass middleware')

  const {password = 0} = req.body

  const passCheck = password && password.length > 3

  if (passCheck) {
    next()
  } else {
    res.status(422).json({message: "Password must be longer than 3 chars"})
  }

}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}