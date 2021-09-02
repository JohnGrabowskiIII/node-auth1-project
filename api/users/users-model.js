const db = require('../../data/db-config')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  console.log('in find()')
  return db('users').select("user_id", "username").orderBy("user_id")
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  // FINDBY NEEDS TO RECIEVE PASSWORD IN QUERY
  // IT GETS APPENDED TO THE BODY WITH MIDDLEWARE
  // AND ENDPOINT COMPARES VALUES
  return db("users").where(filter).orderBy("user_id")
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  console.log("in findById()")
  return db("users").select("user_id", "username").where({user_id})
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  console.log('in add()')
  const [id] = await db("users").insert(user)
  return findById(id)
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add
}