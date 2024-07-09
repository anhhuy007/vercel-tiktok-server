const postgres = require('../database/database_wrapper')

const localAuthController = {
    getAccounts: async(req, res) => {
        try {
            const query = "SELECT * FROM account"
            const { rows } = await postgres.query(query)
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    signup: async(req, res) => {
        try {
            const { email, password, username } = req.body
            const query = "INSERT INTO account (email, password, username) VALUES ($1, $2, $3) RETURNING *"
            const { rows } = await postgres.query(query, [email, password, username])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body
            const query = "SELECT * FROM user_info WHERE email = $1 AND password = $2"
            const { rows } = await postgres.query(query, [email, password])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = localAuthController