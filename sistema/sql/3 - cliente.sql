CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo CHAR(1),
    nome VARCHAR(200) NOT NULL,
    documento VARCHAR(20) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(200),
    status CHAR(1) DEFAULT 'A',
    cep VARCHAR(10),
    logradouro VARCHAR(200),
    numero VARCHAR(40),
    complemento VARCHAR(50),
    bairro VARCHAR(60),
    cidade VARCHAR(60),
    estado VARCHAR(2),
    st_registro CHAR(1) DEFAULT 'A',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cliente_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    tipo VARCHAR(50),
    campo VARCHAR(50),
    antes TEXT,
    depois TEXT,
    motivo TEXT,
    usuario VARCHAR(100),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

