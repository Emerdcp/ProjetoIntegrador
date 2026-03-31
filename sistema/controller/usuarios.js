const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// LISTAR
router.get("/usuarios", auth, (req, res) => {

    const sql = `
        SELECT id, nome, email, perfil, status
        FROM usuarios
        WHERE status = 'A'
        ORDER BY nome
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// BUSCAR
router.get("/usuarios/:id", auth, (req, res) => {

    const sql = `
        SELECT id, nome, documento, status, telefone, email, perfil
        FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});

// SALVAR
router.post("/usuarios", auth, async (req, res) => {

    const { id, nome, documento, status, telefone, email, perfil, senha } = req.body;

    if (id) {

        let sql = `
            UPDATE usuarios SET
            nome=?, documento=?, status=?, telefone=?, email=?, perfil=?
        `;

        let params = [nome, documento, status, telefone, email, perfil];

        if (senha) {
            const hash = await bcrypt.hash(senha, 10);
            sql += ", senha=?";
            params.push(hash);
        }

        sql += " WHERE id=?";
        params.push(id);

        db.query(sql, params, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });

    } else {

        const hash = await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO usuarios
            (nome, documento, status, telefone, email, senha, perfil)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql,
            [nome, documento, status, telefone, email, hash, perfil],
            (err) => {
                if (err) return res.status(500).json(err);
                res.json({ success: true });
            }
        );
    }
});

// EXCLUIR
router.delete("/usuarios/:id", auth, (req, res) => {

    const sql = "UPDATE usuarios SET status='I' WHERE id=?";

    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

module.exports = router;