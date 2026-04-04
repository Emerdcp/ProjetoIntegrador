CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    tipo_estoque ENUM('MP','PA','PO','SU') NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL DEFAULT 0,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_item_tipo (item_id, tipo_estoque)
);