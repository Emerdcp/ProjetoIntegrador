const express = require("express");
const router = express.Router();
const db = require("../config/db");

// LISTAR
router.get("/", (req, res) => {

    db.query(
        "SELECT id, nome, telefone, email, status FROM fornecedores WHERE st_registro='A' ORDER BY nome",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

// BUSCAR
router.get("/:id", (req, res) => {

    db.query(
        "SELECT * FROM fornecedores WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result[0]);
        }
    );
});

// SALVAR
router.post("/", (req, res) => {

    const f = req.body;

    const documento = f.documento || null;

    if (f.id) {

        const sql = `
            UPDATE fornecedores SET
            tipo=?, nome=?, documento=?, telefone=?, email=?, status=?,
            cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, estado=?
            WHERE id=?
        `;

        db.query(sql, [
            f.tipo, f.nome, documento, f.telefone, f.email, f.status,
            f.cep, f.logradouro, f.numero, f.complemento,
            f.bairro, f.cidade, f.estado, f.id
        ], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });

    } else {

        const sql = `
            INSERT INTO fornecedores
            (tipo,nome,documento,telefone,email,status,
            cep,logradouro,numero,complemento,bairro,cidade,estado,st_registro)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'A')
        `;

        db.query(sql, [
            f.tipo, f.nome, documento, f.telefone, f.email, f.status,
            f.cep, f.logradouro, f.numero, f.complemento,
            f.bairro, f.cidade, f.estado
        ], (err) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({ success: true });
        });
    }
});

// EXCLUIR
router.delete("/:id", (req, res) => {

    db.query(
        "UPDATE fornecedores SET st_registro='I' WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

module.exports = router;