const postgres = require('../database/database')
const bookController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgres.query("select * from books")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getById: async(req, res) => {
        try {
            const { rows } = await postgres.query("select * from books where book_id = $1", [req.params.id])

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
            const { title, price } = req.body

            const sql = 'INSERT INTO books(title, price) VALUES($1, $2) RETURNING *'

            const { rows } = await postgres.query(sql, [title, price])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    },
    updateById: async(req, res) => {
        try {
            const { title, price } = req.body

            const sql = 'UPDATE books set title = $1, price = $2 where book_id = $3 RETURNING *'

            const { rows } = await postgres.query(sql, [title, price, req.params.id])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    },
    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

            const { rows } = await postgres.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})
            

        } catch (error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    }
}

const createCommentTableSQL = `
    CREATE TABLE IF NOT EXISTS comment(
        id SERIAL PRIMARY KEY,
        short_id VARCHAR(255),
        content TEXT,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        commenter_id VARCHAR(255),
        like_count INT, 
        reply_count INT
    ) 
`;

module.exports = bookController