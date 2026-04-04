const express = require("express");
const router = express.Router();
const db = require("../config/db");

const upload = require("../config/upload");


// ===============================
// LISTAR
// ===============================
router.get("/", (req, res) => {

    const sql = `
        SELECT 
            p.*,
            c.nome AS categoria_nome,
            (
                SELECT caminho 
                FROM produtos_imagens 
                WHERE produto_id = p.id AND principal = 1 
                LIMIT 1
            ) AS imagem_principal
        FROM produtos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        WHERE p.st_registro = 'A'
        ORDER BY p.nome
    `;

    db.query(sql, (err, rows) => {

        if (err) {
            console.error("🔥 ERRO LISTAR:", err);
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});


// ===============================
// BUSCAR POR ID
// ===============================
router.get("/:id", (req, res) => {

    db.query(
        "SELECT * FROM produtos WHERE id = ?",
        [req.params.id],
        (err, rows) => {

            if (err) {
                console.error("🔥 ERRO BUSCAR:", err);
                return res.status(500).json({ error: err.message });
            }

            res.json(rows[0] || null);
        }
    );
});


// ===============================
// SALVAR
// ===============================
router.post("/", (req, res) => {

    try {

        const {
            id,
            nome,
            categoria_id,
            status,
            controle_estoque,
            codigo_fabricante,
            localizacao,
            unidade,
            preco_venda,
            preco_custo,
            estoque,
            envia_catalogo
        } = req.body;

        // 🔥 NORMALIZAÇÃO (ESSENCIAL)
        const dados = {
            nome: nome || "",
            categoria_id: categoria_id ? Number(categoria_id) : null,
            status: status || "A",
            controle_estoque: controle_estoque || "S",
            codigo_fabricante: codigo_fabricante || "",
            localizacao: localizacao || "",
            unidade: unidade || "UN",
            preco_venda: Number(preco_venda) || 0,
            preco_custo: Number(preco_custo) || 0,
            estoque: Number(estoque) || 0,
            envia_catalogo: envia_catalogo || "N"
        };

        // ================= EDITAR =================
        if (id) {

            db.query(`
                UPDATE produtos SET
                    nome = ?,
                    categoria_id = ?,
                    status = ?,
                    controle_estoque = ?,
                    codigo_fabricante = ?,
                    localizacao = ?,
                    unidade = ?,
                    preco_venda = ?,
                    preco_custo = ?,
                    estoque = ?,
                    envia_catalogo = ?
                WHERE id = ?
            `, [
                dados.nome,
                dados.categoria_id,
                dados.status,
                dados.controle_estoque,
                dados.codigo_fabricante,
                dados.localizacao,
                dados.unidade,
                dados.preco_venda,
                dados.preco_custo,
                dados.estoque,
                dados.envia_catalogo,
                id
            ], (err) => {

                if (err) {
                    console.error("🔥 ERRO UPDATE:", err);
                    return res.status(500).json({ error: err.message });
                }

                res.json({ success: true, id });
            });

            return;
        }

        // ================= NOVO =================
        db.query(`
            INSERT INTO produtos (
                nome, categoria_id, status, controle_estoque,
                codigo_fabricante, localizacao, unidade,
                preco_venda, preco_custo, estoque, envia_catalogo, st_registro
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'A')
        `, [
            dados.nome,
            dados.categoria_id,
            dados.status,
            dados.controle_estoque,
            dados.codigo_fabricante,
            dados.localizacao,
            dados.unidade,
            dados.preco_venda,
            dados.preco_custo,
            dados.estoque,
            dados.envia_catalogo
        ], (err, result) => {

            if (err) {
                console.error("🔥 ERRO INSERT:", err);
                return res.status(500).json({ error: err.message });
            }

            res.json({
                success: true,
                id: result.insertId
            });
        });

    } catch (error) {
        console.error("🔥 ERRO GERAL:", error);
        res.status(500).json({ error: "Erro inesperado" });
    }
});


// ===============================
// EXCLUIR (SOFT)
// ===============================
router.delete("/:id", (req, res) => {

    db.query(`
        UPDATE produtos SET st_registro = 'I'
        WHERE id = ?
    `, [req.params.id], (err) => {

        if (err) {
            console.error("🔥 ERRO DELETE:", err);
            return res.status(500).json({ error: err.message });
        }

        res.json({ success: true });
    });
});


// ===============================
// UPLOAD IMAGEM
// ===============================
router.post("/upload/:id", upload.array("imagens", 5), (req, res) => {

    const produtoId = req.params.id;

    if (!produtoId) {
        return res.status(400).json({ error: "Produto ID inválido" });
    }

    if (!req.files || req.files.length === 0) {
        return res.json({ success: true });
    }

    let processadas = 0;

    req.files.forEach(file => {

        const caminho = file.filename;

        db.query(`
            SELECT COUNT(*) as total 
            FROM produtos_imagens 
            WHERE produto_id = ? AND principal = 1
        `, [produtoId], (err, result) => {

            if (err) {
                console.error("🔥 ERRO CHECK IMG:", err);
                return res.status(500).json({ error: err.message });
            }

            const principal = result[0].total > 0 ? 0 : 1;

            db.query(`
                INSERT INTO produtos_imagens (produto_id, caminho, principal)
                VALUES (?, ?, ?)
            `, [produtoId, caminho, principal], (err2) => {

                if (err2) {
                    console.error("🔥 ERRO INSERT IMG:", err2);
                    return res.status(500).json({ error: err2.message });
                }

                processadas++;

                if (processadas === req.files.length) {
                    res.json({ success: true });
                }
            });

        });

    });
});


router.post("/filtrar", (req, res) => {

    const { nome, categoria_id, status } = req.body;

    let sql = `
        SELECT 
            p.*,
            c.nome AS categoria_nome,
            (
                SELECT caminho 
                FROM produtos_imagens 
                WHERE produto_id = p.id AND principal = 1 
                LIMIT 1
            ) AS imagem_principal
        FROM produtos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        WHERE p.st_registro = 'A'
    `;

    const params = [];

    if (nome) {
        sql += " AND p.nome LIKE ?";
        params.push("%" + nome + "%");
    }

    if (categoria_id) {
        sql += " AND p.categoria_id = ?";
        params.push(categoria_id);
    }

    if (status) {
        sql += " AND p.status = ?";
        params.push(status);
    }

    sql += " ORDER BY p.nome";

    db.query(sql, params, (err, rows) => {

        if (err) {
            console.error("🔥 ERRO FILTRO:", err);
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});


// ===============================
module.exports = router;