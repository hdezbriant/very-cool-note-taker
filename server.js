const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));
// require('./routes/htmlroute')(app);
require('./routes/apiroute')(app);

// Push newNote to notes array
app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});