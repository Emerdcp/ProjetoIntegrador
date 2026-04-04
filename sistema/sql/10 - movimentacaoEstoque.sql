CREATE TABLE estoque_movimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    tipo_movimento CHAR(2) NOT NULL 
    COMMENT '(ET) Entrada, (SD) Saida, (AE) Ajuste Entrada, (AS) Ajuste Saida, (PD) Producao',
    tipo_estoque ENUM('MP','PA','PO','SU') DEFAULT 'PA',
    quantidade DECIMAL(10,2) NOT NULL,
    observacao VARCHAR(255),
    usuario_id INT,
    data_movimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (item_id) REFERENCES produtos(id)
);