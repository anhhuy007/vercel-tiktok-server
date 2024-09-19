const postgres = require('../database/database')

const searchController = {
    getPopularVideos: async(req, res) => {
        try {
            const limit = req.params.limit
            const query = `SELECT video.*, user_info.handle, user_info.avatar_url FROM video
                            JOIN user_info ON video.channel_id = user_info.id
                            ORDER BY RANDOM() DESC LIMIT $1`
            const { rows } = await postgres.query(query, [limit])

            res.json({msg: "OK", data: rows})
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    getSearchedItems: async(req, res) => {
        try {
            const userId = req.params.userId
            const query = `SELECT * FROM search_history WHERE user_id = $1`
            const { rows } = await postgres.query(query, [userId])

            res.json({msg: "OK", data: rows})
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    findUserByQuery: async(req, res) => {
        try {
            const searchQuery = "%" + req.params.searchQuery + "%"
            const query = `SELECT * FROM user_info WHERE handle LIKE $1`
            const { rows }  = await postgres.query(query, [searchQuery])

            res.json({msg: "OK", data: rows})
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    saveSearchHistory: async(req, res) => {
        try {
            const { userId, searchQuery, searchedUserId } = req.body
            const query = `INSERT INTO search_history(user_id, search_query, searched_user_id) VALUES($1, $2, $3) RETURNING *`
            const { rows } = await postgres.query(query, [userId, searchQuery, searchedUserId])

            res.json({msg: "OK", data: rows})
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    getUserById: async(req, res) => {
        try {
            const userId = req.params.id
            const query = `SELECT * FROM user_info WHERE id = $1`
            const { rows } = await postgres.query(query, [userId])

            res.json({msg: "OK", data: rows[0]})
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    deleteSearchHistory: async(req, res) => {
        try {
            const historyId = req.params.id
            const query = `DELETE FROM search_history WHERE id = $1`
            await postgres.query(query, [historyId])

            res.json({msg: "OK"})
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    }
}

module.exports = searchController 