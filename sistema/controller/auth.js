const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

// LOGIN
router.post("/login", (req, res) => {

    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email=? AND status='A'";

    db.query(sql, [email], async (err, result) => {

        try {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(401).json({ erro: "Usuário não encontrado" });
            }

            const usuario = result[0];

            if (!usuario.senha) {
                return res.status(500).json({ erro: "Senha inválida no banco" });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return res.status(401).json({ erro: "Senha inválida" });
            }

            req.session.usuario = {
                id: usuario.id,
                nome: usuario.nome,
                perfil: usuario.perfil
            };

            res.json({ success: true });

        } catch (error) {

            console.error("ERRO LOGIN:", error);

            res.status(500).json({
                erro: "Erro interno no login",
                detalhe: error.message
            });
        }

    });

});

// SESSÃO
router.get("/sessao", (req, res) => {

    if (!req.session.usuario) {
        return res.status(401).json({ logado: false });
    }

    res.json({
        logado: true,
        usuario: req.session.usuario
    });
});

// LOGOUT
router.post("/logout", (req, res) => {

    req.session.destroy();
    res.json({ success: true });
});

module.exports = router;