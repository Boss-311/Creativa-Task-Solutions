const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Note",
    tableName: "notes",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        title: {
            type: "varchar",
            nullable: false,
        },
        content: {
            type: "text",
            nullable: false,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "notes",
            joinColumn: { name: "userId" },
            onDelete: "CASCADE",
        },
    },
});
