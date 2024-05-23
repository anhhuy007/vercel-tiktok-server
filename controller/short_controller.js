const postgre = require('../database/database')
const { updateById } = require('./book_controller')

const shortController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from short")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getById: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from short where id = $1", [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(404).json({msg: "not found"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    create: async(req, res) => {
        try {
            const { youtube_id, title, video_url, thumbnail_url, views, channel_id } = req.body
            const sql = 'INSERT INTO short(youtube_id, title, video_url, thumbnail_url, views, channel_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
            const { row } = await postgre.query(sql, [youtube_id, title, video_url, thumbnail_url, views, channel_id])

            res.json({msg: "OK", data: row[0]})
        }
        catch(error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    },
    updateById: async(req, res) => {
        try {
            const { youtube_id, title, video_url, thumbnail_url, views, channel_id } = req.body
            const sql = 'UPDATE short set youtube_id = $1, title = $2, video_url = $3, thumbnail_url = $4, views = $5, channel_id = $6 where id = $7 RETURNING *'
            const { rows } = await postgre.query(sql, [youtube_id, title, video_url, thumbnail_url, views, channel_id, req.params.id])

            res.json({msg: "OK", data: rows[0]})
        }
        catch(error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    },
    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM short where id = $1 RETURNING *'
            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            res.status(404).json({msg: "not found"})
        }
        catch(error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    }
}

module.exports = shortController