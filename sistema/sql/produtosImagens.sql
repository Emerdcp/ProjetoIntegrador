CREATE TABLE cad_produto_imagem (
    id_imagem INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    img_caminho VARCHAR(255) NOT NULL,
    img_ordem INT DEFAULT 1,

    CONSTRAINT fk_produto_imagem
        FOREIGN KEY (id_produto)
        REFERENCES cad_produto(id_produto)
        ON DELETE CASCADE
);
