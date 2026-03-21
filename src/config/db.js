const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // padrão XAMPP
    database: 'erp_loja', // nome do seu banco
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;