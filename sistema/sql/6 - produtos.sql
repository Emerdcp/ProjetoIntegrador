CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    categoria_id INT,
    status CHAR(1) DEFAULT 'A',
    controle_estoque CHAR(1) DEFAULT 'S',
    codigo_fabricante VARCHAR(100),
    localizacao VARCHAR(100),
    unidade VARCHAR(10),
    preco_venda DECIMAL(10,2),
    preco_custo DECIMAL(10,2),
    estoque DECIMAL(10,2) DEFAULT 0,
    envia_catalogo CHAR(1) DEFAULT 'N',
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    st_registro CHAR(1) DEFAULT 'A',
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


CREATE TABLE produtos_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT,
    campo VARCHAR(100),
    antes TEXT,
    depois TEXT,
    alterado_por INT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE produtos_imagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    caminho VARCHAR(255) NOT NULL,
    principal TINYINT(1) DEFAULT 0,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);