const postgres = require('./database_wrapper')

const uploadAccounts = async (req, res) => {
    console.log("Uploading accounts...")
    const query1 = `CREATE TABLE account (
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        email VARCHAR(255) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
                    );`

    const query2 = `INSERT INTO account (id, username, email, password, created_at) VALUES
                    (1, 'alice123', 'alice@example.com', '123', '2024-05-21 12:00:00+07'),
                    (2, 'bob456', 'bob@example.com', 'another_secret', '2024-05-20 18:30:00+07'),
                    (3, 'john_doe', 'john@example.com', 'secure_password123', '2024-05-22 09:00:00+07'),
                    (4, 'jane_smith', 'jane@example.com', 'another_secure_pwd', '2024-05-21 15:30:00+07');
                    `

    try {
        await postgres.query(query1)
        await postgres.query(query2)
        console.log("Accounts uploaded successfully")
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { uploadAccounts }