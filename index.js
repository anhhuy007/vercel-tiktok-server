const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/books', (req, res) => {
    // This is where we will retrieve books from the database
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
