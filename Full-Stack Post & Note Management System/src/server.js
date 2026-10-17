const app = require('./app');
const AppDataSource = require('./db');

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully! 🚀");
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} 🔥`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });

    module.exports = app;
