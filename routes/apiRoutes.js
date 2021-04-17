const { uuid } = require('uuidv4');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(notesData));

    app.post('/api/notes', (req, res) => {
        let note = req.body;

        let = req.body;

        const noteObj = {
            title: note.title,
            text: note.text,
            id: uuid(),
        };

        console.log(req)
        console.log(res)
    })

    app.delete('/api/notes:id', (req, res) => {

    })

};