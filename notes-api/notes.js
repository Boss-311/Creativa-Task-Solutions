const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'notes.json');

// Helper function to read notes from the JSON file
const readNotes = () => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
  const fileData = fs.readFileSync(FILE_PATH, 'utf8');
  return JSON.parse(fileData || '[]');
};

// Helper function to write notes to the JSON file
const writeNotes = (notes) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2), 'utf8');
};

// GET /notes - Get all notes
app.get('/notes', (req, res) => {
  const notes = readNotes();
  res.status(200).json(notes);
});

// GET /notes/:id - Get single note by ID
app.get('/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note);
});

// POST /notes - Create a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const notes = readNotes();
  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title,
    content
  };

  notes.push(newNote);
  writeNotes(notes);

  res.status(201).json({ message: 'Note created successfully', note: newNote });
});

// PUT /notes/:id - Full Replace (Replaces entire object with a new one)
app.put('/notes/:id', (req, res) => {
  const { title, content } = req.body;

  // PUT requires both title and content to replace the complete object
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required for full replacement' });
  }

  const notes = readNotes();
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  // Replacing the old object entirely with a new object
  notes[noteIndex] = {
    id: noteId,
    title,
    content
  };

  writeNotes(notes);

  res.status(200).json({ message: 'Note replaced successfully', note: notes[noteIndex] });
});

// PATCH /notes/:id - Partial Update (Updates only specified values)
app.patch('/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  // Update only the fields provided in request body
  if (req.body.title !== undefined) note.title = req.body.title;
  if (req.body.content !== undefined) note.content = req.body.content;

  writeNotes(notes);

  res.status(200).json({ message: 'Note updated successfully', note });
});

// DELETE /notes/:id - Delete note
app.delete('/notes/:id', (req, res) => {
  let notes = readNotes();
  const noteId = parseInt(req.params.id);
  const initialLength = notes.length;

  notes = notes.filter(n => n.id !== noteId);

  if (notes.length === initialLength) {
    return res.status(404).json({ message: 'Note not found' });
  }

  writeNotes(notes);

  res.status(200).json({ message: 'Note deleted successfully' });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = 3580;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});