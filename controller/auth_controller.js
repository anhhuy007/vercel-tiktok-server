const postgres = require('../database/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { authenticateToken, generateAccessToken, generateRefreshToken } = require('../auth_token')
const saltRounds = 10

let refreshTokens = []

const authController = {
    getAccounts: async(req, res) => {
        await authenticateToken(req, res, async() => {
            try {
                const query = "SELECT * FROM account"
                const { rows } = await postgres.query(query)
                res.json({msg: "OK", data: rows})
            } catch (error) {
                console.log("Error: ", err)
                res.status(401).json({msg: error.msg})
            }
        })
    },
    signup: async(req, res) => {
        try {
            const { email, password, username } = req.body

            if (!email || !password || !username) return res.status(400).json({msg: "Please fill in all the fields"})
            
            const exists = await postgres.query("SELECT * FROM account WHERE email = $1", [email])
            if (exists.rows.length > 0) return res.status(409).json({msg: "Account already exists"})

            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const query = "INSERT INTO account (email, password, username) VALUES ($1, $2, $3) RETURNING *"
            const { rows } = await postgres.query(query, [email, hashedPassword, username])
            res.json({msg: "Signup successful", data: {id: rows[0].id, email: rows[0].email, username: rows[0].username}})
        } catch (error) {
            console.log("Error: ", error)
            res.status(400).json({msg: error.msg})
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body
            const query = "SELECT * FROM ACCOUNT WHERE email = $1"
            const { rows } = await postgres.query(query, [email])

            if (rows.length === 0) {
                res.status(404).json({msg: "Account not found"})
            } else {
                const user = rows[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = generateAccessToken({email: user.email, username: user.username})
                    const refreshToken = generateRefreshToken({email: user.email, username: user.username})
                    refreshTokens.push(refreshToken)
                    res.json({msg: "Login successfull", data: 
                        {
                            token: token, 
                            refresh_token: refreshToken, 
                            user: {
                                id: user.id,
                                email: user.email, 
                                username: user.username
                            }
                        }
                    })
                } else {
                    res.status(401).json({msg: "Invalid password"})
                }
            }

        } catch (error) {
            console.log("Error: ", error)
            res.status(401).json({msg: error.msg})
        }
    },
    token: async(req, res) => {
        try {
            const refreshToken = req.body.refresh_token
            if (refreshToken === null) return res.sendStatus(401)
            if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403) // The token is not valid

            jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
                console.log(err)
                if (err) return res.sendStatus(403)
                const accessToken = generateAccessToken({email: user.email, username: user.username})
            res.json({accessToken})
            })
        }
        catch(err) {
            console.log("Error: ", err)
            res.sendStatus(401).json({msg: err.msg})
        }
    },
    logout: async(req, res) => {
        refreshTokens = refreshTokens.filter(token => token !== req.body.refresh_token)
        res.sendStatus(204)
    }
}

module.exports = authController