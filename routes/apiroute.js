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
      .then((data) => {
        // send notes data json in response
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        // send an error response
        return res.status(500).end();
      });
  });

  app.post('/api/notes', (req, res) => {
    notes
      .getAll()
      .then((noteData) => {
        // add to notes and return promise
        return notes.push(req.body);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  });
}
  // This code isn't part of the assignment. This route was added to easily
  // clear out all the table data to facilitate demonstration. Don"t worry about
  // it!
  // app.post('/api/clear', (req, res) => {
  //   Promise.all([tables.clear(), waitingList.clear()])
  //     .then(() => res.json({ ok: true }))
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(500).end();
  //     });
  // });