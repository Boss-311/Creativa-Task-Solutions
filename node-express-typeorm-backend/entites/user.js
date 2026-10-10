const { EntitySchema } = require("typeorm");

const UserSchema = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "varchar",
            unique: true,
        },
        email: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar",
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

module.exports = UserSchema;
