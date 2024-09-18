const postgres = require('../database/database')
const { get } = require('../router/auth_router')

const feedController = {
    getFeedVideo: async(req, res) => {
        try {
            // get random video info and its channel info
            const query = `SELECT video.*, user_info.handle, user_info.avatar_url FROM video 
                            JOIN user_info ON video.channel_id = user_info.id 
                            ORDER BY RANDOM() LIMIT 1`
            const result = await postgres.query(query)
            res.status(200).send(result.rows[0])
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    getFeedVideos: async(req, res) => {
        try {
            const limit = req.params.limit
            const query = `SELECT video.*, user_info.handle, user_info.avatar_url FROM video
                            JOIN user_info ON video.channel_id = user_info.id
                            ORDER BY RANDOM() DESC LIMIT $1`
            const result = await
            postgres.query(query, [limit])
            res.status(200).send(result.rows)
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    getAllVideos: async(req, res) => {
        try {
            const query = `SELECT * from video ORDER BY id ASC`;
            const result = await postgres.query(query)
            res.status(200).send(result.rows)
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    },
    postVideo: async(req, res) => {
        try {
            const { channelId, title, song, videoUrl, thumbnailUrl } = req.body
            const query = `INSERT INTO video (channel_id, title, song, video_url, thumbnail_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`
            const result = await postgres.query(query, [channelId, title, song, videoUrl, thumbnailUrl])
            res.status(200).send(result.rows[0])
        }
        catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error")
        }
    }
}

module.exports = feedController 