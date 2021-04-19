// Dependencies for fs and uuid
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Function to read the database
function readDB() {
    let info = fs.readFileSync('./db/db.json', 'utf8');
    let db = JSON.parse(info);
    
    return db;
}

// Function to write to the database
function writeDB(data) {
    fs.writeFile('./db/db.json', JSON.stringify(data), (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}

module.exports = (app) => {
    // GET route for API
    app.get('/api/notes', (req, res) => res.json(readDB()));

    // POST route for API
    app.post('/api/notes', (req, res) => {
        let note = req.body;
        
        /* Gives a status code if something goes wrong
            Otherwise, it handles the POST request */
        if (note.title === undefined || note.text === undefined) {
            res.status(400);
            res.send('No Title or Text detected');
        } else {
            let currData = readDB();
            
            const noteObj = {
                title: note.title,
                text: note.text,
                id: uuidv4()
            };
            currData.push(noteObj);
            writeDB(currData);

            res.status(200);
            res.send('Thank you!');
        }
    });

    // DELETE route for API
    app.delete('/api/notes/:id', (req, res) => {
        let deleteID = req.params.id;

        /* Gives a status code if something goes wrong
            If all is good, it handles the DELETE request */
        if (deleteID === undefined) {
            res.status(400);
            res.send('No Title or Text detected');
        } else {
            let currData = readDB();

            let filtered = currData.filter(function (value) {
                return value.id !== deleteID;
            });
            writeDB(filtered);

            res.status(200);
            res.send(deleteID);
        }
    })
};