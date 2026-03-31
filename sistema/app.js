const express = require("express");
const app = express();
const path = require("path");

// CONTROLLERS
const catalogo = require("./controller/catalogo");
const usuarios = require("./controller/usuarios");
const auth = require("./controller/auth");

// ROTAS
app.use("/api", catalogo);
app.use("/api", usuarios);
app.use("/api", auth);

// INDEX
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

module.exports = app;
