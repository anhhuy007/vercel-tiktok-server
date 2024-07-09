const { localPool, remotePool } = require('./database')

class DatabaseWrapper {
    constructor() {
        this.useRemote = process.env.USE_REMOTE_DB == 'true'
    }

    async query(query, params) {
        const pool = this.useRemote ? remotePool : localPool
        return await pool.query(query, params)
    }
}

module.exports = new DatabaseWrapper()