CREATE TABLE pedidos_catalogo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_nome VARCHAR(150),
    telefone VARCHAR(30),
    observacao TEXT,
    total DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'PENDENTE',
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos_catalogo_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    produto_nome VARCHAR(150),
    quantidade INT,
    preco DECIMAL(10,2)
);

