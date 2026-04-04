CREATE TABLE estoque_movimento (
    id INT AUTO_INCREMENT PRIMARY KEY,    
    item_id INT NOT NULL,    
    tipo_estoque ENUM('MP','PA','PO','SU') NOT NULL,    
    tipo_movimento ENUM('E','S','A') NOT NULL,    
    quantidade DECIMAL(10,2) NOT NULL,    
    saldo_anterior DECIMAL(10,2),
    saldo_atual DECIMAL(10,2),    
    documento VARCHAR(50),
    observacao TEXT,    
    usuario_id INT,    
    data_movimento DATETIME DEFAULT CURRENT_TIMESTAMP
);