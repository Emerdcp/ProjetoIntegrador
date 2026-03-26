const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// 🔥 IMPORTA APP
const sistemaApp = require("./sistema/app");

// 🔥 PRIMEIRO API
app.use("/", sistemaApp);

// 🔥 DEPOIS ARQUIVOS
app.use(express.static(path.join(__dirname, "sistema")));

// 🔥 UPLOADS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});