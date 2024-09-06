const postgres = require('../database/database')

const commentController = {
    getCommentOnVideo: async (req, res) => {
        try {
            const video_id = req.params.video_id

            const commentDbQuery = 
            `
            SELECT CMT.*, U.handle, U.avatar_url 
            FROM comment CMT
            JOIN user_info U ON CMT.commenter_id = U.id
            WHERE CMT.video_id = $1
            `

            const { rows } = await postgres.query(commentDbQuery, [video_id])
            res.json(
                {
                    msg: "OK",
                    data: rows
                }
            )
        } catch (err) {
            console.log(err)
            res.status(400).json({msg: err.msg})
        }
    },
    addCommentOnVideo: async (req, res) => {
        try {
            const { video_id, commenter_id, comment } = req.body

            const commentDbQuery = "INSERT INTO comments (video_id, commenter_id, comment) VALUES ($1, $2, $3) RETURNING *"
            const { rows } = await postgres.query(commentDbQuery, [video_id, commenter_id, comment])
            res.json(
                {
                    msg: "Comment is added successfully",
                    data: rows[0]
                }
            )
        }
        catch (err) {
            console.log(err)
            res.status(400).json({msg: err.msg})
        }
    }
}

module.exports = commentController