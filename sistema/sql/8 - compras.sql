CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fornecedores_id INT NOT NULL,
    data_pedido DATETIME NOT NULL,
    forma_pagamento VARCHAR(20),
    parcelas INT DEFAULT 1,
    intervalo INT DEFAULT 30,
    valor_total DECIMAL(10,2) DEFAULT 0,
    status CHAR(1) DEFAULT 'A',
    st_registro CHAR(1) DEFAULT 'A',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_compras_fornecedores FOREIGN KEY (fornecedores_id) REFERENCES fornecedores(id)
);


CREATE TABLE compras_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_compras_itens_compra FOREIGN KEY (compra_id) REFERENCES compras(id),

    CONSTRAINT fk_compras_itens_produto FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE compras_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT NOT NULL,
    usuario VARCHAR(100),
    campo VARCHAR(100),
    antes TEXT,
    depois TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
);