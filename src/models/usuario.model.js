const db = require('../config/db');

exports.listar = async () => {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
};

exports.criar = async (dados) => {
    const { nome, email, senha, status } = dados;

    const [result] = await db.query(
        'INSERT INTO usuarios (nome, email, senha, status) VALUES (?, ?, ?, ?)',
        [nome, email, senha, status]
    );

    return result.insertId;
};

exports.editar = async (id, dados) => {
    const { nome, email, status } = dados;

    await db.query(
        'UPDATE usuarios SET nome = ?, email = ?, status = ? WHERE id = ?',
        [nome, email, status, id]
    );
};

exports.excluir = async (id) => {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
};