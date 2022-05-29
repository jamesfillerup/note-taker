const path = require('path');
const fs = require('fs')
const router = require('express').Router();
const uniqid = require('uniqid');

    router.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });


    router.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);

        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };

        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);

    });


    router.delete('/api/notes/:id', (req, res) => {
        
        let db = JSON.parse(fs.readFileSync('db/db.json'))
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);
        
    });

module.exports = router;