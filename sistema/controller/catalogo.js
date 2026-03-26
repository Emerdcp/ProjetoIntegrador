const express = require("express");
const router = express.Router();
const db = require("../config/db");

// LISTAR PRODUTOS
router.get("/catalogo", (req, res) => {

    const sql = `
        SELECT 
            p.id,
            c.nome AS categoria,
            p.nome,
            p.preco_venda,
            GROUP_CONCAT(pi.caminho ORDER BY pi.principal DESC) AS imagens
        FROM produtos p
        LEFT JOIN produtos_imagens pi 
            ON pi.produto_id = p.id
        LEFT JOIN categorias c 
            ON c.id = p.categoria_id
        WHERE p.st_registro = 'A'
        GROUP BY p.id
        ORDER BY p.nome
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }

        res.json(result);
    });

});

module.exports = router;