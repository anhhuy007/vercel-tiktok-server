const postgres = require('../database/database');

const userController = {
    getAll: async(req, res) => {
        try {
            const { rows } = postgres.query("SELECT * FROM user_info");
            res.json({msg: "OK", data: rows});
        }
        catch(err) {
            res.json({msg: err.msg});
        }
    },

    getById: async(req, res) => {
        try {
            const { rows } = postgres.query("SELECT * FROM user_info WHERE id = $1", [req.params.id]);
            if (rows[0]) {
                return res.json({msg: "OK", data: rows});
            }
            res.status(404).json({msg: "NOT FOUND"});
        }
        catch(err) {
            res.json({msg: err.msg});
        }
    },

    create: async(req, res) => {
        const { youtube_id, handle, name, subscribers, description, avatar_url, thumbnail_url, youtube_url } = req.body;
        try {
            const { rows } = postgres.query("INSERT INTO user_info (youtube_id, handle, name, subscribers, description, avatar_url, thumbnail_url, youtube_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [youtube_id, handle, name, subscribers, description, avatar_url, thumbnail_url, youtube_url]);
            res.status(201).json({msg: "CREATED", data: rows});
        }
        catch(err) {
            res.json({msg: err.msg});
        }
    },

    update: async(req, res) => {
        const { youtube_id, handle, name, subscribers, description, avatar_url, thumbnail_url, youtube_url } = req.body;
        try {
            const { rows } = postgres.query("UPDATE user_info SET youtube_id = $1, handle = $2, name = $3, subscribers = $4, description = $5, avatar_url = $6, thumbnail_url = $7, youtube_url = $8 WHERE id = $9 RETURNING *", [youtube_id, handle, name, subscribers, description, avatar_url, thumbnail_url, youtube_url, req.params.id]);
            if (rows[0]) {
                return res.json({msg: "OK", data: rows});
            }
            res.status(404).json({msg: "NOT FOUND"});
        }
        catch(err) {
            res.json({msg: err.msg});
        }
    },

    delete: async(req, res) => {
        try {
            const { rows } = postgres.query("DELETE FROM user_info WHERE id = $1 RETURNING *", [req.params.id]);
            if (rows[0]) {
                return res.json({msg: "OK", data: rows});
            }
            res.status(404).json({msg: "NOT FOUND"});
        }
        catch(err) {
            res.json({msg: err.msg});
        }
    }
}

module.exports = userController;