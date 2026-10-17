const { z } = require("zod");

const createNoteSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().min(5, "Content must be at least 5 characters long"),
});

const updateNoteSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    content: z.string().min(5, "Content must be at least 5 characters long").optional(),
});

module.exports = {
    createNoteSchema,
    updateNoteSchema,
};