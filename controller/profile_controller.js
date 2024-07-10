const postgres = require('../database/database')
const { authenticateToken } = require('../auth_token')

const profileController = {
    getProfileInfoById: async(req, res) => {
        await authenticateToken(req, res, async() => {
            try {
                const query = "SELECT * FROM user_info WHERE id = $1"
                const { rows } = await postgres.query(query, [req.params.id])
                res.json({msg: "OK", data: rows})
            } catch (error) {   
                res.json({msg: error.msg})
            }   
        })
    },
    getLatestVideosByUserId: async(req, res) => {
        try {
            const { rows } = await postgres.query("SELECT * FROM video WHERE channel_id = $1 ORDER BY created_at DESC", [req.params.id])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getPopularVideosByUserId: async(req, res) => {
        try {
            const { rows } = await postgres.query("SELECT * FROM video WHERE channel_id = $1 ORDER BY views DESC", [req.params.id])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getOldestVideosByUserId: async(req, res) => {
        try {
            const { rows } = await postgres.query("SELECT * FROM video WHERE channel_id = $1 ORDER BY created_at ASC", [req.params.id])
            res.json({msg: "OK", data: rows})
        }
        catch(error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = profileController