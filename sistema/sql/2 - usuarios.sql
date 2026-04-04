CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    documento VARCHAR(20),
    status CHAR(1) DEFAULT 'A',
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    telefone VARCHAR(20),
    email VARCHAR(150),
    senha VARCHAR(255) NOT NULL,
    perfil CHAR(1) DEFAULT 'O'
);

CREATE TABLE usuarios_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    campo VARCHAR(100),
    antes TEXT,
    depois TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    alterado_por INT
);

INSERT INTO `usuarios` (`id`, `nome`, `documento`, `status`, `dataCadastro`, `telefone`, `email`, `senha`, `perfil`) VALUES
(1, 'Emerson de Carvalho', '', 'A', '2026-02-20 11:49:48', '(19) 98108-2383', 'emersoncarvalho@hotmail.com.br', '$2y$10$Ucqnam1exgfouPmg6zKHPOnpi7Qc3h/vGlZcb1cCdoiDCQxL1149O', 'A');
