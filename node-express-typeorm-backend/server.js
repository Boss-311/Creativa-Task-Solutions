require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppDataSource = require('./db');
const UserSchema = require("./entites/user"); 
const NoteSchema = require("./entites/note"); 
const authMiddleware = require("./auth.middleware");

const app = express();
app.use(express.json());
app.post("/auth/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userRepository = AppDataSource.getRepository(UserSchema);

        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        await userRepository.save(newUser);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(UserSchema);

        const user = await userRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.get("/auth/me", authMiddleware, async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(UserSchema);
        const user = await userRepository.findOneBy({ id: req.user.userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...userData } = user;
        return res.json(userData);

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.post("/notes", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const noteRepository = AppDataSource.getRepository(NoteSchema);

        const newNote = noteRepository.create({
            title,
            content,
            user: { id: req.user.userId }
        });

        await noteRepository.save(newNote);
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 1️⃣ أند بوينت GET لجلب كل النوتس الخاصة باليوزر المسجل بالتوكن
app.get("/notes", authMiddleware, async (req, res) => {
    try {
        const noteRepository = AppDataSource.getRepository(NoteSchema);
        
        // جلب النوتس اللي تخص اليوزر ده بس عن طريق الـ ID بتاعه في التوكن
        const notes = await noteRepository.find({
            where: { user: { id: req.user.userId } }
        });

        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 2️⃣ أند بوينت GET للبحث في النوتس (Search by title or content)
app.get("/notes/search", authMiddleware, async (req, res) => {
    try {
        const { keyword } = req.query; // الكلمة اللي اليوزر بيبحث عنها في الـ URL
        const noteRepository = AppDataSource.getRepository(NoteSchema);

        if (!keyword) {
            return res.status(400).json({ message: "Please provide a search keyword" });
        }

        // استخدام TypeORM لعمل بحث بالـ Like في العنوان أو المحتوى مع التأكد إنها تخص اليوزر نفسه
        const notes = await noteRepository.createQueryBuilder("note")
            .where("note.userId = :userId", { userId: req.user.userId })
            .andWhere("(note.title LIKE :keyword OR note.content LIKE :keyword)", { keyword: `%${keyword}%` })
            .getMany();

        res.json({ results: notes });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/notes", authMiddleware, async (req, res) => {
    try {
        const noteRepository = AppDataSource.getRepository(NoteSchema);
        
        const notes = await noteRepository.find({
            where: { user: { id: req.user.userId } }
        });

        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.delete("/notes/:id", authMiddleware, async (req, res) => {
    try {
        const noteId = req.params.id;
        const noteRepository = AppDataSource.getRepository(NoteSchema);

        
        const note = await noteRepository.findOne({
            where: { id: noteId, user: { id: req.user.userId } }
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found or you don't have permission to delete it" });
        }

        await noteRepository.remove(note);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("Database connection failure: ", error));

module.exports = app;

