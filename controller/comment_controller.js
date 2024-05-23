const postgre = require('../database/database')

const commentController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from comment")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getById: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from comment where id = $1", [req.params.id])

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
            const { short_id, content, create_at, commenter_id, like_count, reply_count } = req.body
            const sql = 'INSERT INTO comment(short_id, content, create_at, commenter_id, like_count, reply_count) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
            const { row } = await postgre.query(sql, [short_id, content, create_at, commenter_id, like_count, reply_count])
            res.json({msg: "OK", data: row[0]})
        }
        catch(error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    },
    updateById: async(req, res) => {
        try {
            const { short_id, content, create_at, commenter_id, like_count, reply_count } = req.body
            const sql = 'UPDATE comment set short_id = $1, content = $2, create_at = $3, commenter_id = $4, like_count = $5, reply_count = $6 where id = $7 RETURNING *'
            const { rows } = await postgre.query(sql, [short_id, content, create_at, commenter_id, like_count, reply_count, req.params.id])
            
            res.json({msg: "OK", data: rows[0]})
        }
        catch(error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    },
    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM comment where id = $1 RETURNING *'
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

/*
    {
    "id": 0,
    "short_id": "f6wD7UV2WR0",
    "content": "Bro got the subway surfers high jump sneakers ability irl 💀",
    "created_at": "1 month ago",
    "commenter_id": "UCM5gMM_HqfKHYIEJ3lstMUA",
    "like_count": 115,
    "reply_count": 2
  }
*/

module.exports = commentController
