const postgres = require('../database/database')

const follow_controller = {
    incrementFollow: async(req, res) => {
        try {
            const { follower_id, following_id } = req.body
            if (!follower_id || !following_id) return res.status(400).json({msg: "Please fill in all the fields"})
            
            const updateFollowerQuery = "INSERT INTO follower (host_id, follower_id) VALUES ($1, $2)"
            const updateFollowingQuery = "INSERT INTO following (host_id, following_id) VALUES ($1, $2)"
            const updateFollowerUserInfoQuery = "UPDATE userinfo SET following = following + 1 WHERE id = $1"
            const updateFollowingUserInfoQuery = "UPDATE userinfo SET follower = follower + 1 WHERE id = $1"

            await postgres.query(updateFollowerQuery, [following_id, follower_id])
            await postgres.query(updateFollowingQuery, [follower_id, following_id])
            await postgres.query(updateFollowerUserInfoQuery, [follower_id])
            await postgres.query(updateFollowingUserInfoQuery, [following_id])

            res.json({
                msg: "Follow is updated successfully",
                data: {
                    follower_id : follower_id,
                    following_id: following_id
                }
            })
        } catch(err) {
            console.log(err)
            res.status(400).json({msg: err.msg})
        }
    }
}

module.exports = follow_controller