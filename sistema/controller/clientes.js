const express = require("express");
const router = express.Router();
const db = require("../config/db");

// LISTAR
router.get("/", (req, res) => {

    const sql = `
        SELECT id, nome, telefone, email, status
        FROM clientes
        WHERE st_registro = 'A'
        ORDER BY nome
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });

});

// BUSCAR
router.get("/:id", (req, res) => {

    db.query(
        "SELECT * FROM clientes WHERE id = ?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result[0]);
        }
    );

});

// SALVAR
router.post("/", (req, res) => {

    const c = req.body;

    if (c.id) {

        const sql = `
            UPDATE clientes SET
            tipo=?, nome=?, documento=?, telefone=?, email=?, status=?,
            cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, estado=?
            WHERE id=?
        `;

        db.query(sql, [
            c.tipo, c.nome, c.documento, c.telefone, c.email, c.status,
            c.cep, c.logradouro, c.numero, c.complemento,
            c.bairro, c.cidade, c.estado, c.id
        ], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });

    } else {

        const sql = `
            INSERT INTO clientes
            (tipo,nome,documento,telefone,email,status,
            cep,logradouro,numero,complemento,bairro,cidade,estado,st_registro)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'A')
        `;

        db.query(sql, [
            c.tipo, c.nome, c.documento, c.telefone, c.email, c.status,
            c.cep, c.logradouro, c.numero, c.complemento,
            c.bairro, c.cidade, c.estado
        ], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    }

});

// EXCLUIR
router.delete("/:id", (req, res) => {

    db.query(
        "UPDATE clientes SET st_registro='I' WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );

});

// HISTÓRICO
router.get("/historico/:id", (req, res) => {

    db.query(
        "SELECT * FROM cliente_logs WHERE cliente_id=? ORDER BY data DESC",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );

});

module.exports = router;