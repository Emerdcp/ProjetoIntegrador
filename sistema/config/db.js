const mysql = require("mysql2");
// const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "erp_loja",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar:", err);
    } else {
        console.log("✅ Conectado ao MySQL");
    }
});

module.exports = connection;