const { DataSource } = require("typeorm");
require("dotenv").config();

const User = require("./entities/User");
const Note = require("./entities/Note");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "course_creativa",
    synchronize: true,
    logging: false,
    entities: [User, Note], });

module.exports = AppDataSource;