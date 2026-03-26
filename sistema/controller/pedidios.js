const express = require("express");
const router = express.Router();
const db = require("../config/db");

// SALVAR PEDIDO
router.post("/pedido", async (req, res) => {

    const { nome, telefone, pagamento, itens } = req.body;

    const conn = db.promise();

    try {

        await conn.beginTransaction();

        let total = 0;
        itens.forEach(i => {
            total += i.preco * i.qtd;
        });

        // INSERE PEDIDO
        const [pedidoResult] = await conn.query(
            `INSERT INTO pedidos_catalogo 
            (cliente_nome, telefone, observacao, total)
            VALUES (?, ?, ?, ?)`,
            [nome, telefone, pagamento, total]
        );

        const pedidoId = pedidoResult.insertId;

        // INSERE ITENS
        for (const item of itens) {
            await conn.query(
                `INSERT INTO pedidos_catalogo_itens
                (pedido_id, produto_id, produto_nome, quantidade, preco)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    pedidoId,
                    item.id,
                    item.nome,
                    item.qtd,
                    item.preco
                ]
            );
        }

        await conn.commit();

        res.json({ sucesso: true, pedido_id: pedidoId });

    } catch (error) {

        await conn.rollback();

        res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }

});

module.exports = router;


router.get("/pedidos", (req, res) => {

    const {
        cliente = "",
        status = "",
        dataInicio = "",
        dataFim = "",
        pagina = 1
    } = req.query;

    const limite = 10;
    const offset = (pagina - 1) * limite;

    let where = "WHERE 1=1";

    if (cliente) where += ` AND cliente_nome LIKE '%${cliente}%'`;
    if (status) where += ` AND status = '${status}'`;
    if (dataInicio) where += ` AND DATE(data_pedido) >= '${dataInicio}'`;
    if (dataFim) where += ` AND DATE(data_pedido) <= '${dataFim}'`;

    // TOTAL
    const sqlTotal = `SELECT COUNT(*) as total FROM pedidos_catalogo ${where}`;

    db.query(sqlTotal, (err, totalResult) => {

        const totalRegistros = totalResult[0].total;
        const totalPaginas = Math.ceil(totalRegistros / limite);

        // DADOS
        const sql = `
            SELECT * FROM pedidos_catalogo
            ${where}
            ORDER BY id DESC
            LIMIT ${limite} OFFSET ${offset}
        `;

        db.query(sql, (err, dados) => {
            res.json({
                dados,
                totalPaginas
            });
        });

    });

});

router.get("/pedido-itens/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM pedidos_catalogo_itens WHERE pedido_id = ?",
        [id],
        (err, result) => {
            res.json(result);
        }
    );

});

router.put("/pedido-status", (req, res) => {

    const { pedido_id, status } = req.body;

    db.query(
        "UPDATE pedidos_catalogo SET status = ? WHERE id = ?",
        [status, pedido_id],
        (err) => {
            if (err) return res.status(500).json({ erro: err });

            res.json({ success: true });
        }
    );

});