const { EntitySchema } = require("typeorm");

const PostSchema = new EntitySchema({
    name: "Post",
    tableName: "posts",
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
            joinColumn: { name: "userId" },
            onDelete: "CASCADE", 
        },
    },
});

module.exports = PostSchema;