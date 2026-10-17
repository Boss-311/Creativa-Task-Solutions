const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { createNoteSchema } = require("../validators/note.validator");

router.get("/", noteController.getNotes);

router.post("/", authMiddleware, validate(createNoteSchema), noteController.createNote);

router.delete("/:id", authMiddleware, noteController.deleteNote);

module.exports = router;


