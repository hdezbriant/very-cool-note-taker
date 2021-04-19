const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

class Store {
  constructor(name) {
    this.path = path.join(__dirname, `${name}.json`);
  }

  getAll() {
    return readFile(this.path, 'utf-8').then((data) => JSON.parse(data));
  }

  write(data) {
    return writeFile(this.path, JSON.stringify(data));
  }

  push(item) {
    const newNote = {
      id: nanoid(10),
      title: item.title,
      text: item.text
    };
    console.log(newNote);
    return this.getAll().then((data) => this.write([...data, newNote]));
  }

  delete(noteId) {
    console.log(noteId);
    return this.getAll().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (noteId === data[i].id) {
          data.splice(i, 1);
        }
      }
      this.write([...data]);
    });
  }
}
  const notes = new Store('notes');

module.exports = { notes };
