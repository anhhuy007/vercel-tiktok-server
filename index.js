const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});

const bookRouter = require('./book_router')

app.use("/api/books", bookRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
