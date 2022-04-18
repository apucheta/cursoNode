const http = require('http');
const express = require('express');

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo!</h1>');
});

// Obtencion de todas las notas
app.get('/api/notes', (request, response) => {
  response.json(notes);
});

// Obtencion de un recurso en especifico segun id
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id.toString() === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// Eliminacion de un recurso segun id
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id.toString !== id);

  response.status(204).end();
});

// Creacion de una nueva nota
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'Content missing',
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Servidor corriendo en el puerto ${PORT}`);
