const AppDataSource = require("../db");

class NoteRepository {
    async findAll() {
        const noteRepo = AppDataSource.getRepository("Note");
        return await noteRepo.find({
            relations: { user: true }
        });
    }

    async findById(id) {
        const noteRepo = AppDataSource.getRepository("Note");
        return await noteRepo.findOne({
            where: { id },
            relations: { user: true }
        });
    }

    async create(noteData) {
        const noteRepo = AppDataSource.getRepository("Note");
        const note = noteRepo.create(noteData);
        return await noteRepo.save(note);
    }

    async delete(id) {
        const noteRepo = AppDataSource.getRepository("Note");
        return await noteRepo.delete(id);
    }
}

module.exports = new NoteRepository();