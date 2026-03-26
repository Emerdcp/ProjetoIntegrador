const express = require("express");
const router = express.Router();
const db = require("../config/db");

// LISTAR PRODUTOS
router.get("/produtos", (req, res) => {

    const sql = "SELECT * FROM produtos"; // ajuste para sua tabela

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }

        res.json(result);
    });

});

module.exports = router;