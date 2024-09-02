const postgres = require('../database/database')

const likeController = {
    incrementLike: async (req, res) => {
        try {
            const { video_id, liker_id } = req.body
            if (!video_id || !liker_id) return res.status(400).json({msg: "Please fill in all the fields"})
            
            const exist = await postgres.query("SELECT * FROM likes WHERE liker_id = $1 and video_id = $2", [liker_id, video_id])
            if (exist.rows.length > 0) return res.status(409).json({msg: "Can not like anymore"})
                
            const likeDbQuery = "INSERT INTO likes (video_id, liker_id) VALUES ($1, $2) RETURNING *"
            const { rows } = await postgres.query(likeDbQuery, [video_id, liker_id])
            const videoDbQuery = "UPDATE video SET likes = likes + 1 WHERE id = $1"
            await postgres.query(videoDbQuery,[video_id])
            res.json(
                {
                    msg: "Like is updated successfully",
                    data: rows[0]
                }
            )

        } catch (err) {
            console.log(err)
            res.status(400).json({msg: err.msg})
        }
    },

    getLikeStatus: async (req, res) => {
        try {
            const { video_id, liker_id } = req.body
            if (!video_id || !liker_id) return res.status(400).json({msg: "Please fill in all the fields"})

            const likeStatus = await postgres.query("SELECT * FROM likes WHERE video_id = $1 AND liker_id = $2", [video_id, liker_id])
            if (likeStatus.rows.length > 0) {
                res.json({
                    msg: "OK", 
                    data: {
                        liked: true
                    }
                })
            } else {
                res.json({
                    msg: "OK", 
                    data: {
                        liked: false
                    }
                })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({msg: err.msg})
        }
    }
}

module.exports = likeController