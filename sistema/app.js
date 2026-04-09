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
const fornecedores = require("./controller/fornecedores");
const vendas = require("./controller/vendas");
const pedido = require("./controller/pedido");

// ROTAS API
router.use("/api/catalogo", catalogo);
router.use("/api/usuarios", usuarios);
router.use("/api/auth", auth);
router.use("/api/clientes", clientes);
router.use("/api/categorias", categorias);
router.use("/api/produtos", produtos);
router.use("/api/fornecedores", fornecedores);
router.use("/api/vendas", vendas);
router.use("/api/pedido", pedido);

// INDEX
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

module.exports = router;

