const util = require("util");
const fs = require("fs");

const readNote = util.promisify(fs.readFile);
const createNote = util.promisify(fs.writeFile);

class Store {
    read() {
        return readNote("db/db.json");
    }

    write(note) {
        return createNote("db/db.json", JSON.stringify(note));
    }

    returnNote() {
        return this.read().then(notes => {
        let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

        return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank");
        }

        const newNote = { title, text };

        return this.returnNote()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote);
    }

    deleteNote(id) {

        return this.returnNote()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Store();