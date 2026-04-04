CREATE TABLE mov_venda_item (
    id_venda_item INT AUTO_INCREMENT PRIMARY KEY,
    id_venda INT NOT NULL,
    id_produto INT NOT NULL,
    item_quantidade INT NOT NULL,
    item_valor_unitario DECIMAL(10,2) NOT NULL,
    item_valor_total DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_item_venda
        FOREIGN KEY (id_venda) REFERENCES mov_venda(id_venda),

    CONSTRAINT fk_item_produto
        FOREIGN KEY (id_produto) REFERENCES cad_produto(id_produto)
);
