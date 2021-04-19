const fs = require('fs');
const path = require('path');
const { notes } = require('../db');

// This module exports a function which accepts an Express app object and
// and sets up the api routes.
module.exports = function (app) {
  app.get('/api/notes', (req, res) => {
    // read notes data from file
    notes
      .getAll()
      .then((noteData) => {
        // send notes data json in response
        res.json(noteData);
      })
      .catch((err) => {
        console.log(err);
        // send an error response
        return res.status(500).end();
      });
  });

  app.post('/api/notes', (req, res) => {
    notes
      .push(req.body)
      .then(() => { return notes.getAll() })
      .then((noteData) => {
        res.json(noteData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  });

  app.delete('/api/notes/:id', (req, res) => {
    const chosenNoteId = req.params.id;
    console.log(chosenNoteId);
    notes
      .delete(chosenNoteId)
      .then(() => {
        res.json();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  });
};