const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= SALVAR =================
router.post("/", (req, res) => {

    const { nome, telefone, pagamento, itens } = req.body;

    if (!nome || !telefone || !itens || !itens.length) {
        return res.status(400).json({ sucesso: false });
    }

    let total = 0;

    itens.forEach(i => {
        total += Number(i.preco) * Number(i.quantidade);
    });

    const sql = `
        INSERT INTO pedidos_catalogo
        (cliente_nome, telefone, observacao, total, status)
        VALUES (?, ?, ?, ?, 'PENDENTE')
    `;

    db.query(sql, [nome, telefone, pagamento, total], (err, result) => {

        if (err) return res.status(500).json(err);

        const pedido_id = result.insertId;

        const sqlItem = `
            INSERT INTO pedidos_catalogo_itens
            (pedido_id, produto_id, produto_nome, quantidade, preco)
            VALUES (?, ?, ?, ?, ?)
        `;

        itens.forEach(i => {
            db.query(sqlItem, [
                pedido_id,
                i.id,
                i.nome,
                i.quantidade,
                i.preco
            ]);
        });

        res.json({ sucesso: true });
    });
});


// ================= LISTAR =================
router.get("/", (req, res) => {

    const sql = `
        SELECT * FROM pedidos_catalogo
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


// ================= ITENS =================
router.get("/:id", (req, res) => {

    const sql = `
        SELECT * FROM pedidos_catalogo_itens
        WHERE pedido_id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = router;