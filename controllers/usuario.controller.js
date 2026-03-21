exports.listar = (req, res) => {
    res.json({ mensagem: 'Listando usuários' });
};

exports.criar = (req, res) => {
    res.json({ mensagem: 'Criando usuário' });
};

exports.editar = (req, res) => {
    res.json({ mensagem: 'Editando usuário' });
};

exports.excluir = (req, res) => {
    res.json({ mensagem: 'Excluindo usuário' });
};