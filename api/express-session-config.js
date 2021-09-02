const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const config = {
    name:"sessionId",
    secret: "keep it secret, keep it safe",
    cookie:{
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUnitialized: false,
    // knex session
    store: new KnexSessionStore({
      knex: require("../data/db-config"),
      tablename: "sessions",
      sidfieldname: "sid",
      createTable: true,
      clearInterval: 1000 * 60 * 60
    })
  }

// MIGHT NEED A RETURN HERE
const sessionConfig = () => session(config)

// module.exports = config
module.exports = sessionConfig