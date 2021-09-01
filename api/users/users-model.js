const db = require('../../data/db-config')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  // TEST
  console.log('in find()')
  return db('users').select("user_id", "username").orderBy("user_id")
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  // TEST
  console.log('in findBy()')
  return db("users").where(filter).orderBy("user_id")
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  // TEST
  // WHERE MIGHT THROW AN ERROR
  // TRYING TO UNDERSTAND HOW IT WAS WRITTEN
  // IN OUR GUIDED PROJECT
  console.log("in findById()")
  return db("users").where("user_id")
}

/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {
  // TEST
  console.log('in add()')
  const newUser = await db("users").insert(user)
  return newUser
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add
}