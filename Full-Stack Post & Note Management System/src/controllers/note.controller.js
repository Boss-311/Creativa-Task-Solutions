const noteService = require("../services/note.service");

class NoteController {
    async getNotes(req, res, next) {
        try {
            const notes = await noteService.getAllNotes();
            return res.status(200).json(notes);
        } catch (err) {
            next(err);
        }
    }

    async createNote(req, res, next) {
        try {
            const userId = req.user.id; 
            const newNote = await noteService.createNote(req.body, userId);
            return res.status(201).json({
                message: "Note created successfully",
                note: newNote,
            });
        } catch (err) {
            next(err);
        }
    }

    async deleteNote(req, res, next) {
        try {
            const noteId = req.params.id;
            const userId = req.user.id;
            const userRole = req.user.role;

            await noteService.deleteNote(noteId, userId, userRole);
            return res.status(200).json({ message: "Note deleted successfully" });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new NoteController();