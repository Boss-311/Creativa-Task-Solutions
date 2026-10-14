require("dotenv").config();
const { DataSource } = require("typeorm");
const UserSchema = require("./entites/user"); 

const PostSchema = require("./entites/post"); 
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, 
    logging: false,
    entities: [UserSchema, PostSchema], 
});

module.exports = AppDataSource;