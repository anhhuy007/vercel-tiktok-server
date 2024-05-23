const postgre = require('../database/database')

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
    deleteAll: async(req, res) => {
        try {
            const sql = 'DELETE FROM short WHERE 1=1'

            const { rows } = await postgre.query(sql)

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            return res.status(404).json({msg: "not found"})
            

        } catch (error) {
            console.log("Something went wrong: ", error)
            res.json({msg: error.msg})
        }
    }
}

module.exports = shortController