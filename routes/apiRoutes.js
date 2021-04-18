const { uuid } = require('uuidv4');
const fs = require('fs');

function readDB() {
    let info = fs.readFileSync('./db/db.json', 'utf8');
    let db = JSON.parse(info);
    return db;
}

function writeDB(data) {
    fs.writeFile('./db/db.json', data, (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(readDB()));

    app.post('/api/notes', (req, res) => {
        let note = req.body;
        
        console.log(note);

        if (note.title === undefined || note.text === undefined) {
            res.status(503);
            res.send('No Title or Text detected');
        } else {
            let oldData = readDB();
            
            const noteObj = {
                title: note.title,
                text: note.text,
                id: uuid(),
            };
            console.log(oldData);
            console.log("oldData");
            console.log(noteObj);
            oldData.push(noteObj);
            writeDB(JSON.stringify(oldData));

            res.status(200);
            res.send('Thank you!');
        }
    })

    app.delete('/api/notes:id', (req, res) => {
        let deleteID = req.body;

        if (deleteID.uuid === undefined) {
            res.status(503);
            res.send('No Title or Text detected');
        } else {
            let oldData = readDB();

            let filtered = oldData.filter(function (value, index, arr) {
                return value.id !== deleteID.uuid;
            });
            console.log("filtered")
            console.log(filtered)
            writeDB(JSON.stringify(filtered));

            res.status(200);
            res.send('Thank you!');
        }
    })
};