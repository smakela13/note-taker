// Dependencies
const path = require('path');

module.exports = (app) => {
    // GET route for the notes.html page
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // GET route that directs user to the index.html page
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}