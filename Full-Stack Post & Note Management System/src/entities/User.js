const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        username: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        password: {
            type: "varchar",
            nullable: false,
        },
        role: {
            type: "varchar",
            default: "user", 
        },
    },
    relations: {
        notes: {
            type: "one-to-many",
            target: "Note",
            inverseSide: "user",
        },
    },
});