const { Pool } = require('pg');
const dbConfig = require('./config');
class DatabaseWrapper {
  constructor() {
      this.useRemote = process.env.USE_REMOTE_DB == 'true'
      this.pool = createRemotePool()
  }

  async query(query, params) {
      return await this.pool.query(query, params)
  }
}

function createRemotePool() {
  remotePool = new Pool(dbConfig.remote);
  remotePool.connect((err) => {
      if (err) {
        console.log("Error connecting to the remote database!", err)
      }
      else {
        console.log("Connected to the remote database!")
      }
    })

  return remotePool
}

function createLocalPool() {
  localPool = new Pool(dbConfig.local);
  localPool.connect((err) => {
      if (err) {
        console.log("Error connecting to the local database!", err)
      }
      else {
        console.log("Connected to the local database!")
      }
    })

  return localPool
}

module.exports = new DatabaseWrapper()