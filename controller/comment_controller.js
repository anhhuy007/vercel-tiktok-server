const postgres = require('../database/database');

const commentController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgres.query("SELECT * FROM comment");
            res.json({msg: "OK", data: rows});
        } catch (error) {
            res.json({msg: error.msg});
        }
    },
    getById: async(req, res) => {
        try {
            const { rows } = await postgres.query("SELECT * FROM comment WHERE id = $1", [req.params.id]);

            if (rows[0]) {
                return res.json({msg: "OK", data: rows});
            }

            res.status(404).json({msg: "NOT FOUND"});
        } catch (error) {
            res.json({msg: error.msg});
        }
    },
    create: async(req, res) => {
        try {
            const { short_id, content, create_at, commenter_id, like_count, reply_count } = req.body;
            const sql = 'INSERT INTO comment(short_id, content, create_at, commenter_id, like_count, reply_count) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const { row } = await postgres.query(sql, [short_id, content, create_at, commenter_id, like_count, reply_count]);
            res.json({msg: "OK", data: row[0]});
        }
        catch(error) {
            console.log("Something went wrong: ", error);
            res.json({msg: error.msg});
        }
    },
    updateById: async(req, res) => {
        try {
            const { short_id, content, create_at, commenter_id, like_count, reply_count } = req.body;
            const sql = 'UPDATE comment SET short_id = $1, content = $2, create_at = $3, commenter_id = $4, like_count = $5, reply_count = $6 WHERE id = $7 RETURNING *';
            const { rows } = await postgres.query(sql, [short_id, content, create_at, commenter_id, like_count, reply_count, req.params.id]);
            
            res.json({msg: "OK", data: rows[0]});
        }
        catch(error) {
            console.log("SOMETHING WENT WRONG: ", error);
            res.json({msg: error.msg});
        }
    },
    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM comment WHERE id = $1 RETURNING *';
            const { rows } = await postgres.query(sql, [req.params.id]);

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]});
            }

            res.status(404).json({msg: "NOT FOUND"});
        }
        catch(error) {
            console.log("SOMETHING WENT WRONG: ", error);
            res.json({msg: error.msg});
        }
    }
}

module.exports = commentController
