const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= LISTAR =================
router.get("/", (req, res) => {

    const sql = `
        SELECT 
            v.id,
            v.data_pedido,
            v.valor_total,
            v.status,
            c.nome AS cliente_nome
        FROM vendas v
        LEFT JOIN clientes c ON c.id = v.cliente_id
        WHERE v.st_registro = 'A'
        ORDER BY v.id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro listar vendas:", err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// ================= FILTRAR =================
router.post("/filtrar", (req, res) => {

    const f = req.body;

    let sql = `
        SELECT 
            v.id,
            v.data_pedido,
            v.valor_total,
            v.status,
            c.nome AS cliente_nome
        FROM vendas v
        LEFT JOIN clientes c ON c.id = v.cliente_id
        WHERE v.st_registro = 'A'
    `;

    const params = [];

    if (f.cliente_id) {
        sql += " AND v.cliente_id = ?";
        params.push(f.cliente_id);
    }

    if (f.status) {
        sql += " AND v.status = ?";
        params.push(f.status);
    }

    if (f.data_inicio) {
        sql += " AND v.data_pedido >= ?";
        params.push(f.data_inicio);
    }

    if (f.data_fim) {
        sql += " AND v.data_pedido <= ?";
        params.push(f.data_fim);
    }

    sql += " ORDER BY v.data_pedido DESC";

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Erro filtro vendas:", err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// ================= BUSCAR VENDA =================
router.get("/:id", (req, res) => {

    const id = req.params.id;

    const sqlVenda = `
        SELECT v.*, c.nome AS cliente_nome
        FROM vendas v
        LEFT JOIN clientes c ON c.id = v.cliente_id
        WHERE v.id = ?
    `;

    db.query(sqlVenda, [id], (err, result) => {

        if (err) return res.status(500).json(err);

        if (!result.length) return res.json(null);

        const venda = result[0];

        const sqlItens = `
            SELECT 
                vi.*,
                p.nome AS produto_nome
            FROM vendas_itens vi
            LEFT JOIN produtos p ON p.id = vi.produto_id
            WHERE vi.venda_id = ?
        `;

        db.query(sqlItens, [id], (err2, itens) => {

            if (err2) return res.status(500).json(err2);

            venda.itens = itens;

            res.json(venda);
        });

    });
});

// ================= SALVAR =================
router.post("/", (req, res) => {

    const v = req.body;

    if (!v.cliente_id || !v.itens || !v.itens.length) {
        return res.status(400).json({
            success: false,
            erro: "Cliente ou itens não informados"
        });
    }

    let total = 0;

    v.itens.forEach(i => {
        total += Number(i.subtotal);
    });

    // ================= INSERT =================
    const sqlVenda = `
        INSERT INTO vendas
        (cliente_id, data_pedido, forma_pagamento, parcelas, intervalo, valor_total, status, st_registro)
        VALUES (?, NOW(), ?, ?, ?, ?, 'A', 'A')
    `;

    db.query(sqlVenda, [
        v.cliente_id,
        v.forma_pagamento,
        v.parcelas || 1,
        v.intervalo || 30,
        total
    ], (err, result) => {

        if (err) {
            console.error("Erro salvar venda:", err);
            return res.status(500).json(err);
        }

        const venda_id = result.insertId;

        const sqlItem = `
            INSERT INTO vendas_itens
            (venda_id, produto_id, quantidade, valor_unitario, subtotal)
            VALUES (?, ?, ?, ?, ?)
        `;

        v.itens.forEach(item => {

            db.query(sqlItem, [
                venda_id,
                item.produto_id,
                item.quantidade,
                item.valor,
                item.subtotal
            ]);
        });

        res.json({ success: true, venda_id });

    });
});

// ================= EXCLUIR =================
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        UPDATE vendas 
        SET st_registro = 'I'
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            console.error("Erro excluir venda:", err);
            return res.status(500).json(err);
        }

        res.json({ success: true });
    });
});

module.exports = router;