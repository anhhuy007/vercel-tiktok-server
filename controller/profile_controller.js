// const postgres = require('../database/database')

// const profileController = {
//     getProfileInfoById: async(req, res) => {
//         try {
//             const { rows } = await postgres.query("SELECT * FROM profile WHERE id = $1", [req.params.id])
//             res.json({msg: "OK", data: rows})
//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     },
//     getLatestVideosById: async(req, res) => {
//         try {
//             const { rows } = await postgres.query("SELECT * FROM short WHERE user_id = $1 ORDER BY create_at DESC", [req.params.id])
//             res.json({msg: "OK", data: rows})
//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     },
//     getPopularVideosById: async(req, res) => {
//         try {
//             const { rows } = await postgres.query("SELECT * FROM short WHERE user_id = $1 ORDER BY like_count DESC", [req.params.id])
//             res.json({msg: "OK", data: rows})
//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     },
//     getOldestVideosById: async(req, res) => {
//         try {
//             const { rows } = await postgres.query("SELECT * FROM short WHERE user_id = $1 ORDER BY create_at ASC", [req.params.id])
//             res.json({msg: "OK", data: rows})
//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     }
// }