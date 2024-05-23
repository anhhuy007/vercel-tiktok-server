const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect((err) => {
    if (err) 
        console.log("Error connecting to the database!", err)
    else
        console.log("Connected to the database!")
})

module.exports = pool;