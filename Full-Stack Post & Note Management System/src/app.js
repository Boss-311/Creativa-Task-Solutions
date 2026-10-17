require("dotenv").config();
const express = require("express");
const path = require("path");
const errorHandler = require("./middleware/errorHandler"); 

const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes"); 

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.use("/auth", authRoutes);
app.use("/posts", noteRoutes);

app.use(errorHandler);

module.exports = app;