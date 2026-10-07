const express = require('express');
const AppDataSource = require('./db');
const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => console.log("PostgreSQL Database Connected Successfully!"))
    .catch((err) => console.error("Database Connection Error:", err));


app.post('/notes', async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const result = await AppDataSource.query(
            `INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *`,
            [title, content]
        );

        res.status(201).json(result[0]);
    } catch (err) {
        console.error("Error in POST /notes:", err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/notes', async (req, res) => {
    try {
        const notes = await AppDataSource.query(`SELECT * FROM notes`);
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/notes/search', async (req, res) => {
    try {
        const { q } = req.query; 

        if (!q) {
            return res.status(400).json({ message: 'Search parameter "q" is required' });
        }

        const notes = await AppDataSource.query(
            `SELECT * FROM notes WHERE title ILIKE $1 OR content ILIKE $1`,
            [`%${q}%`]
        );

        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});



app.listen(3005, () => {
    console.log("Server is running on port 3005");
});
