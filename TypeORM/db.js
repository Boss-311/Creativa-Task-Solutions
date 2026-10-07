const { DataSource } = require('typeorm');
const Note = require('./note');

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12Aa12Bb1234#",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Note]
});

module.exports = AppDataSource;