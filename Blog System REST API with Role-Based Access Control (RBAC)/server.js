require("dotenv").config({ path: ".env" });
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppDataSource = require('./db');
const { z } = require("zod");
const UserSchema = require("./entites/user"); 
const PostSchema = require("./entites/post"); 
const authMiddleware = require("./auth.middleware");
const requireRole = require("./middleware/requireRole");



const app = express();
app.use(express.json());

const validateRegister = z.object({
    username: z.string().min(3).max(20).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(20).optional(),
});

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});



app.delete("/users/:id", authMiddleware, requireRole("admin"), async (req, res) => {
});

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
            role: "user", 
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
            { userId: user.id, role: user.role },
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


app.post("/posts", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const postRepository = AppDataSource.getRepository(PostSchema);

        const newPost = postRepository.create({
            title,
            content,
            user: { id: req.user.userId }
        });

        await postRepository.save(newPost);
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/posts", async (req, res) => {
    try {
        const postRepository = AppDataSource.getRepository(PostSchema);
        const posts = await postRepository.find({ relations: ["user"] });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/posts/search", async (req, res) => {
    try {
        const { keyword } = req.query;
        const postRepository = AppDataSource.getRepository(PostSchema);

        if (!keyword) {
            return res.status(400).json({ message: "Please provide a search keyword" });
        }

        const posts = await postRepository.createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .where("(post.title LIKE :keyword OR post.content LIKE :keyword)", { keyword: `%${keyword}%` })
            .getMany();

        res.json({ results: posts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.delete("/posts/:id", authMiddleware, async (req, res) => {
    try {
        const postId = req.params.id;
        const postRepository = AppDataSource.getRepository(PostSchema);

        const post = await postRepository.findOne({
            where: { id: postId },
            relations: ["user"]
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isOwner = post.user.id === req.user.userId;
        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ 
                message: "Access denied. You can only delete your own posts unless you are an admin." 
            });
        }

        await postRepository.remove(post);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



app.delete("/users/:id", authMiddleware, requireRole("admin"), async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(UserSchema);
        const id = req.params.id;

        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userRepository.remove(user);
        return res.json({ message: "User deleted successfully by admin" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});


const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("Database connection failure: ", error));

module.exports = app;