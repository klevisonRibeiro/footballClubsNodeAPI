const mysql = require('mysql');

const connection = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

connection.connect((error) => {
    if(error) throw error;
    console.log(`Successful connection: Database - ${process.env.DB_NAME}`);
});

module.exports = connection;