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
        try {
            const { username, email, password, role } = req.body;
            const sql = 'INSERT INTO user_info(username, email, password, role) VALUES($1, $2, $3, $4) RETURNING *';
            const { row } = postgres.query(sql, [username, email, password, role]);
            res.json({msg: "OK", data: row[0]});
        }
        catch(err) {
            console.log("Something went wrong: ", err);
            res.json({msg: err.msg});
        }
    },

    updateById: async(req, res) => {
        try {
            const { username, email, password, role } = req.body;
            const sql = 'UPDATE user_info SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *';
            const { rows } = postgres.query(sql, [username, email, password, role, req.params.id]);
            res.json({msg: "OK", data: rows[0]});
        }
        catch(err) {
            console.log("SOMETHING WENT WRONG: ", err);
            res.json({msg: err.msg});
        }
    },

    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM user_info WHERE id = $1 RETURNING *';
            const { rows } = postgres.query(sql, [req.params.id]);
            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]});
            }
            res.status(404).json({msg: "NOT FOUND"});
        }
        catch(err) {
            res.json({msg: err.msg});
        }
    }
}

module.exports = userController;