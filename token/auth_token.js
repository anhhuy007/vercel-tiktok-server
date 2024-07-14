const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer token
    if (token === null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '15m'})
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_SECRET_KEY, {expiresIn: '7d'})
}

module.exports = { authenticateToken, generateAccessToken, generateRefreshToken }