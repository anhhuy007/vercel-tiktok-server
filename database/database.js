const { Pool } = require('pg');
const dbConfig = require('./config');

localPool = new Pool(dbConfig.local);
remotePool = new Pool(dbConfig.remote);

localPool.connect((err) => {
  if (err) {
    console.log("Error connecting to the local database!", err)
  }
  else {
    console.log("Connected to the local database!")
  }
})

remotePool.connect((err) => {
  if (err) {
    console.log("Error connecting to the remote database!", err)
  }
  else {
    console.log("Connected to the remote database!")
  }
})

module.exports = { localPool, remotePool };
