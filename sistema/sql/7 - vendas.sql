CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_pedido DATETIME NOT NULL,
    forma_pagamento VARCHAR(20),
    parcelas INT DEFAULT 1,
    intervalo INT DEFAULT 30,
    valor_total DECIMAL(10,2) DEFAULT 0,
    status CHAR(1) DEFAULT 'A',
    st_registro CHAR(1) DEFAULT 'A',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vendas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE vendas_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_vendas_itens_venda FOREIGN KEY (venda_id) REFERENCES vendas(id),

    CONSTRAINT fk_vendas_itens_produto FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE vendas_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    usuario VARCHAR(100),
    campo VARCHAR(100),
    antes TEXT,
    depois TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE vendas ADD pedido_id INT;