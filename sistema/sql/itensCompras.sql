CREATE TABLE mov_compra_item (
    id_compra_item INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT NOT NULL,
    id_produto INT NOT NULL,
    item_quantidade INT NOT NULL,
    item_valor_unitario DECIMAL(10,2) NOT NULL,
    item_valor_total DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_item_compra
        FOREIGN KEY (id_compra) REFERENCES mov_compra(id_compra),

    CONSTRAINT fk_item_compra_produto
        FOREIGN KEY (id_produto) REFERENCES cad_produto(id_produto)
);
