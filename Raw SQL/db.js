const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12Aa12Bb1234#", 
    database: "postgres",
    synchronize: false, 
    logging: false
});

module.exports = AppDataSource;
