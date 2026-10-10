require("dotenv").config();
const { DataSource } = require("typeorm");
const UserSchema = require("./entites/user");
const NoteSchema = require("./entites/note"); // 👈 أضفنا استدعاء ملف الـ note هنا

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [UserSchema, NoteSchema], // 👈 حطينا الـ User و الـ Note سوا هنا
});

module.exports = AppDataSource;