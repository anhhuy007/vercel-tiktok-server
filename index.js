const express = require('express');
const bookController = require('./book_controller');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/books', bookController.getAll);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
