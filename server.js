
const express = require('express');
const app = express();
const port = 3000;

// TODO: Add your Google Cloud Speech-to-Text API key here
const googleApiKey = 'YOUR_GOOGLE_API_KEY';

app.get('/', (req, res) => {
    res.send('English Speaking Practice App Backend');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
