const { connect } = require('../router/auth_router');

// config.js
require('dotenv').config();

const dbConfig = {
  local: {
    user: process.env.LOCAL_DB_USER,
    host: process.env.LOCAL_DB_HOST,
    database: process.env.LOCAL_DB_NAME,
    password: process.env.LOCAL_DB_PASSWORD,
    port: process.env.LOCAL_DB_PORT,
  },
  remote: {
    connectionString: process.env.POSTGRES_URL
  }
};

module.exports = dbConfig;