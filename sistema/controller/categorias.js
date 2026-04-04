const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= LISTAR =================
router.get("/", (req, res) => {

    const sql = `
        SELECT id, nome
        FROM categorias
        ORDER BY nome
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// ================= BUSCAR =================
router.get("/:id", (req, res) => {

    db.query(
        "SELECT * FROM categorias WHERE id = ?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result[0]);
        }
    );
});

// ================= SALVAR =================
router.post("/", (req, res) => {

    const { id, nome } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: "Nome obrigatório" });
    }

    if (id) {

        const sql = "UPDATE categorias SET nome=? WHERE id=?";

        db.query(sql, [nome, id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });

    } else {

        const sql = "INSERT INTO categorias (nome) VALUES (?)";

        db.query(sql, [nome], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    }
});

// ================= EXCLUIR =================
router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM categorias WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

module.exports = router;