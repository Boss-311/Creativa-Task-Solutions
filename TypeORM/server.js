const express = require('express');
const { ILike } = require('typeorm');
const AppDataSource = require('./db');

const app = express();

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("PostgreSQL Connected via TypeORM Successfully!");

        app.listen(3005, () => {
            console.log("TypeORM Server is running on port 3005");
        });
    })
    .catch((err) => {
        console.error("Database Connection Error:", err);
    });
app.post('/notes', async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const noteRepository = AppDataSource.getRepository('Note');
        
       
        const newNote = noteRepository.create({ title, content });
        await noteRepository.save(newNote);

        res.status(201).json(newNote);
    } catch (err) {
        console.error("Error in POST /notes:", err);
        res.status(500).json({ error: err.message });
    }
});


app.get('/notes', async (req, res) => {
    try {
        const noteRepository = AppDataSource.getRepository('Note');
        const notes = await noteRepository.find();
        
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

        const noteRepository = AppDataSource.getRepository('Note');

        const notes = await noteRepository.find({
            where: [
                { title: ILike(`%${q}%`) },
                { content: ILike(`%${q}%`) }
            ]
        });

        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.listen(3005, () => {
    console.log("TypeORM Server is running on port 3005");
});



