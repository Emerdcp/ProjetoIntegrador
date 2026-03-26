const express = require("express");
const router = express.Router();
const path = require("path");

// 🔥 IMPORTAR CONTROLLERS
const catalogo = require("./controller/catalogo");


// 🔥 ROTAS API
router.use("/api", catalogo);



// 🔥 ROTA PRINCIPAL
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

module.exports = router;