const express = require("express");
const router = express.Router();
const path = require("path");

// CONTROLLERS
const catalogo = require("./controller/catalogo");
const usuarios = require("./controller/usuarios");
const auth = require("./controller/auth");
const clientes = require("./controller/clientes");
const categorias = require("./controller/categorias");
const produtos = require("./controller/produtos");

// ROTAS API
router.use("/api/catalogo", catalogo);
router.use("/api/usuarios", usuarios);
router.use("/api/auth", auth);
router.use("/api/clientes", clientes);
router.use("/api/categorias", categorias);
router.use("/api/produtos", produtos);

// INDEX
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

module.exports = router;

