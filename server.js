const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

app.use(express.json());

// 🔥 SESSION PRIMEIRO
app.use(session({
    secret: "erp_node_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// 🔥 IMPORTA SISTEMA
const sistemaApp = require("./sistema/app");

// 🔥 USA DIRETO
app.use(sistemaApp);

// STATIC
app.use(express.static(path.join(__dirname, "sistema")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});