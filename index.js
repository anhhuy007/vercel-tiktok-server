const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
