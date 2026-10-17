const noteRepository = require("../repositories/note.repository");
class NoteService {
    async getAllNotes() {
        return await noteRepository.findAll();
    }

    async createNote(noteData, userId) {
        return await noteRepository.create({
            ...noteData,
            user: userId,
        });
    }

    async deleteNote(noteId, userId, userRole) {
        const note = await noteRepository.findById(noteId);
        
        if (!note) {
            const error = new Error("Note not found");
            error.statusCode = 404;
            throw error;
        }

        if (userRole !== "admin" && note.user.id !== userId) {
            const error = new Error("Unauthorized: You can only delete your own notes");
            error.statusCode = 403;
            throw error;
        }

        return await noteRepository.delete(noteId);
    }
}

module.exports = new NoteService();