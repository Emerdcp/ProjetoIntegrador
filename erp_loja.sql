-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Abr-2026 às 00:48
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `erp_loja`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`) VALUES
(1, 'Celular'),
(2, 'Brinquedos');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `tipo` char(1) DEFAULT NULL,
  `nome` varchar(200) NOT NULL,
  `documento` varchar(20) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `status` char(1) DEFAULT 'A',
  `cep` varchar(10) DEFAULT NULL,
  `logradouro` varchar(200) DEFAULT NULL,
  `numero` varchar(40) DEFAULT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `bairro` varchar(60) DEFAULT NULL,
  `cidade` varchar(60) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `st_registro` char(1) DEFAULT 'A',
  `data_cadastro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `tipo`, `nome`, `documento`, `telefone`, `email`, `status`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `st_registro`, `data_cadastro`) VALUES
(1, NULL, 'Emerson Carvalho Pinto', '360.673.818-85', '(19) 99819-8563', 'emersoncarvalho@hotmail.com.br', 'A', '13467-275', 'Via Francisco Boldrini', '100', NULL, 'Jardim Recanto', 'Americana', 'SP', 'A', '2026-03-16 20:33:45'),
(2, '', 'KARINA FERNANDES DE CARVALHO', '', '(19) 98313-3025', 'karidcf@gmail.com', 'A', '13467-275', 'Via Francisco Boldrini', '100', 'BL 17 AP 104', 'Jardim Recanto', 'Americana', 'SP', 'A', '2026-03-20 21:20:55'),
(5, '', 'karu', '33', '(19) 98313-3025', 'karidcf@gmail.com', 'A', '13467-275', 'Via Francisco Boldrini', '100', 'BL 17 AP 104', 'Jardim Recanto', 'Americana', 'SP', 'A', '2026-03-20 21:21:34'),
(6, 'F', 'Juliana Cirqueira', '111.111.111-11', '(19) 98313-3025', 'karidcf@gmail.com', 'A', '13467-275', 'Via Francisco Boldrini', '100', 'BL 17 AP 104', 'Jardim Recanto', 'Americana', 'SP', 'I', '2026-03-20 21:34:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente_logs`
--

CREATE TABLE `cliente_logs` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `campo` varchar(50) DEFAULT NULL,
  `antes` text DEFAULT NULL,
  `depois` text DEFAULT NULL,
  `motivo` text DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cliente_logs`
--

INSERT INTO `cliente_logs` (`id`, `cliente_id`, `tipo`, `campo`, `antes`, `depois`, `motivo`, `usuario`, `data`) VALUES
(1, 1, 'CADASTRO', NULL, NULL, NULL, NULL, 'Administrador', '2026-03-16 20:33:45'),
(2, 1, 'ALTERACAO_CAMPO', 'tipo', '', 'F', NULL, 'Administrador', '2026-03-16 20:33:49'),
(3, 2, 'CADASTRO', NULL, NULL, NULL, NULL, 'Administrador', '2026-03-20 21:20:55'),
(4, 5, 'CADASTRO', NULL, NULL, NULL, NULL, 'Administrador', '2026-03-20 21:21:34'),
(5, 6, 'CADASTRO', NULL, NULL, NULL, NULL, 'Administrador', '2026-03-20 21:34:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `fornecedores_id` int(11) NOT NULL,
  `data_pedido` datetime NOT NULL,
  `forma_pagamento` varchar(20) DEFAULT NULL,
  `parcelas` int(11) DEFAULT 1,
  `intervalo` int(11) DEFAULT 30,
  `valor_total` decimal(10,2) DEFAULT 0.00,
  `status` char(1) DEFAULT 'A',
  `st_registro` char(1) DEFAULT 'A',
  `data_cadastro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `compras`
--

INSERT INTO `compras` (`id`, `fornecedores_id`, `data_pedido`, `forma_pagamento`, `parcelas`, `intervalo`, `valor_total`, `status`, `st_registro`, `data_cadastro`) VALUES
(1, 1, '2026-03-16 21:26:00', 'CARTAO', 1, 30, '60.00', 'A', 'A', '2026-03-16 21:26:21');

-- --------------------------------------------------------

--
-- Estrutura da tabela `compras_historico`
--

CREATE TABLE `compras_historico` (
  `id` int(11) NOT NULL,
  `compra_id` int(11) NOT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `campo` varchar(100) DEFAULT NULL,
  `antes` text DEFAULT NULL,
  `depois` text DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `compras_itens`
--

CREATE TABLE `compras_itens` (
  `id` int(11) NOT NULL,
  `compra_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `quantidade` decimal(10,2) NOT NULL,
  `valor_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `compras_itens`
--

INSERT INTO `compras_itens` (`id`, `compra_id`, `produto_id`, `quantidade`, `valor_unitario`, `subtotal`) VALUES
(1, 1, 2, '1.00', '60.00', '60.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `estoque`
--

CREATE TABLE `estoque` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `tipo_estoque` enum('MP','PA','PO','SU') NOT NULL,
  `quantidade` decimal(10,2) NOT NULL DEFAULT 0.00,
  `data_atualizacao` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `estoque`
--

INSERT INTO `estoque` (`id`, `item_id`, `tipo_estoque`, `quantidade`, `data_atualizacao`) VALUES
(1, 1, 'PA', '5.00', '2026-03-16 21:58:07'),
(2, 2, 'PA', '11.00', '2026-03-16 22:00:47');

-- --------------------------------------------------------

--
-- Estrutura da tabela `estoque_movimentos`
--

CREATE TABLE `estoque_movimentos` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `tipo_movimento` char(2) NOT NULL COMMENT '(ET) Entrada, (SD) Saida, (AE) Ajuste Entrada, (AS) Ajuste Saida, (PD) Producao',
  `tipo_estoque` enum('MP','PA','PO','SU') DEFAULT 'PA',
  `quantidade` decimal(10,2) NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `data_movimento` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `estoque_movimentos`
--

INSERT INTO `estoque_movimentos` (`id`, `item_id`, `tipo_movimento`, `tipo_estoque`, `quantidade`, `observacao`, `usuario_id`, `data_movimento`) VALUES
(1, 1, 'ET', 'PA', '5.00', 'Entrada de Material Pronto', 1, '2026-03-16 21:58:07'),
(2, 2, 'ET', 'PA', '10.00', 'Entrada de Compra de Carrinho', 1, '2026-03-16 21:58:23'),
(3, 2, 'ET', 'PA', '1.00', 'Encontrei no estoque', 1, '2026-03-16 22:00:47');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedores`
--

CREATE TABLE `fornecedores` (
  `id` int(11) NOT NULL,
  `tipo` char(1) DEFAULT NULL,
  `nome` varchar(200) NOT NULL,
  `documento` varchar(20) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `status` char(1) DEFAULT 'A',
  `cep` varchar(10) DEFAULT NULL,
  `logradouro` varchar(200) DEFAULT NULL,
  `numero` varchar(40) DEFAULT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `bairro` varchar(60) DEFAULT NULL,
  `cidade` varchar(60) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `st_registro` char(1) DEFAULT 'A',
  `data_cadastro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fornecedores`
--

INSERT INTO `fornecedores` (`id`, `tipo`, `nome`, `documento`, `telefone`, `email`, `status`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `st_registro`, `data_cadastro`) VALUES
(1, 'F', 'Karina Fernandes', '', '(19) 98108-2383', 'karina@gmail.com', 'A', '13470-470', 'Rua da Igualdade', '239', '', 'Jardim Paz', 'Americana', 'SP', 'A', '2026-03-16 20:33:57'),
(6, 'F', 'Emerson Carvalho', NULL, '19983133025', 'karidcf@gmail.com', 'A', '13467-275', 'V Francisco Boldrini', '100', '', 'Jardim Recanto', 'Americana', 'SP', 'I', '2026-04-04 09:49:29');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor_logs`
--

CREATE TABLE `fornecedor_logs` (
  `id` int(11) NOT NULL,
  `fornecedor_id` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `campo` varchar(50) DEFAULT NULL,
  `antes` text DEFAULT NULL,
  `depois` text DEFAULT NULL,
  `motivo` text DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fornecedor_logs`
--

INSERT INTO `fornecedor_logs` (`id`, `fornecedor_id`, `tipo`, `campo`, `antes`, `depois`, `motivo`, `usuario`, `data`) VALUES
(1, 1, 'CADASTRO', NULL, NULL, NULL, NULL, 'Administrador', '2026-03-16 20:33:57');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos_catalogo`
--

CREATE TABLE `pedidos_catalogo` (
  `id` int(11) NOT NULL,
  `cliente_nome` varchar(150) DEFAULT NULL,
  `telefone` varchar(30) DEFAULT NULL,
  `observacao` text DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'PENDENTE',
  `data_pedido` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedidos_catalogo`
--

INSERT INTO `pedidos_catalogo` (`id`, `cliente_nome`, `telefone`, `observacao`, `total`, `status`, `data_pedido`) VALUES
(1, 'Emerson Carvalho', '19998198563', 'Dinheiro', '2630.00', 'PENDENTE', '2026-03-18 21:17:25'),
(2, 'Emerson Carvalho', '19998198563', 'Dinheiro', '130.00', 'PENDENTE', '2026-03-18 21:23:24'),
(3, 'Emerson Carvalho', '19998198563', 'Dinheiro', '2630.00', 'PENDENTE', '2026-03-18 21:39:38'),
(4, 'Emerson Carvalho', '19998198563', 'Dinheiro', '130.00', 'PENDENTE', '2026-03-18 21:39:54'),
(5, 'Emerson Carvalho', '19998198563', 'Dinheiro', '130.00', 'V', '2026-03-18 21:40:06'),
(6, 'Emerson Carvalho', '19998198563', 'Dinheiro', '130.00', 'APROVADO', '2026-03-18 21:50:44'),
(7, 'Emerson Carvalho', '19998198563', 'Dinheiro', '130.00', 'APROVADO', '2026-03-18 21:52:28'),
(8, 'Emerson Carvalho', '19981082383', 'Prazo', '2500.00', 'V', '2026-03-20 19:58:58'),
(9, 'KARINA FERNANDES DE CARVALHO', '19983133025', 'Prazo', '130.00', 'PENDENTE', '2026-03-20 20:33:35'),
(10, 'Juliana', '19981082383', 'Prazo', '2500.00', 'V', '2026-03-20 21:33:46');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos_catalogo_itens`
--

CREATE TABLE `pedidos_catalogo_itens` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  `produto_id` int(11) DEFAULT NULL,
  `produto_nome` varchar(150) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedidos_catalogo_itens`
--

INSERT INTO `pedidos_catalogo_itens` (`id`, `pedido_id`, `produto_id`, `produto_nome`, `quantidade`, `preco`) VALUES
(1, 1, 1, 'Celular Samsung SF24', 1, '2500.00'),
(2, 1, 2, 'Carrinho de Controle', 1, '130.00'),
(3, 2, 2, 'Carrinho de Controle', 1, '130.00'),
(4, 3, 2, 'Carrinho de Controle', 1, '130.00'),
(5, 3, 1, 'Celular Samsung SF24', 1, '2500.00'),
(6, 4, 2, 'Carrinho de Controle', 1, '130.00'),
(7, 5, 2, 'Carrinho de Controle', 1, '130.00'),
(8, 6, 2, 'Carrinho de Controle', 1, '130.00'),
(9, 7, 2, 'Carrinho de Controle', 1, '130.00'),
(10, 8, 1, 'Celular Samsung SF24', 1, '2500.00'),
(11, 9, 2, 'Carrinho de Controle', 1, '130.00'),
(12, 10, 1, 'Celular Samsung SF24', 1, '2500.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `status` char(1) DEFAULT 'A',
  `controle_estoque` char(1) DEFAULT 'S',
  `codigo_fabricante` varchar(100) DEFAULT NULL,
  `localizacao` varchar(100) DEFAULT NULL,
  `unidade` varchar(10) DEFAULT NULL,
  `preco_venda` decimal(10,2) DEFAULT NULL,
  `preco_custo` decimal(10,2) DEFAULT NULL,
  `estoque` decimal(10,2) DEFAULT 0.00,
  `envia_catalogo` char(1) DEFAULT 'N',
  `dataCadastro` datetime DEFAULT current_timestamp(),
  `st_registro` char(1) DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `categoria_id`, `status`, `controle_estoque`, `codigo_fabricante`, `localizacao`, `unidade`, `preco_venda`, `preco_custo`, `estoque`, `envia_catalogo`, `dataCadastro`, `st_registro`) VALUES
(1, 'Celular Samsung SF24', 1, 'A', 'S', 'Sansung', '', 'PC', '2500.00', '1800.00', '5.00', 'S', '2026-03-16 20:37:00', 'A'),
(2, 'Carrinho de Controle', 2, 'A', 'S', 'Carrinho', '', 'UN', '130.00', '60.00', '11.00', 'S', '2026-03-16 20:37:23', 'A'),
(3, 'A Torre dos Vingadores', 2, 'A', 'S', '', '', 'UN', '2000.00', '0.00', '6.00', 'N', '2026-04-03 14:53:37', 'A'),
(4, 'A Torre dos Vingadores 1', 2, 'A', 'S', '', '', 'UN', '2000.00', '0.00', '6.00', 'N', '2026-04-03 16:01:44', 'I'),
(5, 'A Torre dos Vingadores', 2, 'A', 'S', NULL, NULL, NULL, '1550.00', NULL, '0.00', 'N', '2026-04-03 16:03:24', 'I'),
(6, 'A Torre dos Vingadores', 2, 'A', 'S', NULL, NULL, NULL, '1000.00', NULL, '0.00', 'N', '2026-04-03 16:09:55', 'I'),
(7, 'A Torre dos Vingadores', 2, 'A', 'S', NULL, NULL, NULL, '1234.00', NULL, '0.00', 'N', '2026-04-03 16:18:40', 'I'),
(8, 'Torre Vingadores', NULL, 'A', 'S', '', '', 'UN', '1500.00', '1000.00', '0.00', 'S', '2026-04-03 16:39:22', 'I'),
(9, 'Torre Vingadores', NULL, 'A', 'S', '', '', 'UN', '1600.00', '800.00', '0.00', 'S', '2026-04-03 16:40:11', 'I'),
(10, 'Torre Vingadores', NULL, 'A', 'S', '', '', 'UN', '3.00', '1.00', '2.00', 'S', '2026-04-03 16:45:33', 'A'),
(11, 'Terro Vingadores', 2, 'A', 'S', '', '', 'UN', '2000.00', '0.00', '5.00', 'N', '2026-04-03 17:05:38', 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos_historico`
--

CREATE TABLE `produtos_historico` (
  `id` int(11) NOT NULL,
  `produto_id` int(11) DEFAULT NULL,
  `campo` varchar(100) DEFAULT NULL,
  `antes` text DEFAULT NULL,
  `depois` text DEFAULT NULL,
  `alterado_por` int(11) DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produtos_historico`
--

INSERT INTO `produtos_historico` (`id`, `produto_id`, `campo`, `antes`, `depois`, `alterado_por`, `data`) VALUES
(1, 2, 'preco_venda', '0.00', '130', 1, '2026-03-16 20:38:10'),
(2, 2, 'preco_custo', '0.00', '70', 1, '2026-03-16 20:38:10'),
(3, 2, 'preco_custo', '70.00', '60', 1, '2026-03-16 21:26:21');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos_imagens`
--

CREATE TABLE `produtos_imagens` (
  `id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `caminho` varchar(255) NOT NULL,
  `principal` tinyint(1) DEFAULT 0,
  `data_registro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produtos_imagens`
--

INSERT INTO `produtos_imagens` (`id`, `produto_id`, `caminho`, `principal`, `data_registro`) VALUES
(1, 1, '69b8941ca7371_3.avif', 1, '2026-03-16 20:37:00'),
(2, 1, '69b8941ca9138_2.avif', 0, '2026-03-16 20:37:00'),
(3, 1, '69b8941caa8c7_1.avif', 0, '2026-03-16 20:37:00'),
(4, 2, '69b89433c22e9_6.webp', 1, '2026-03-16 20:37:23'),
(5, 2, '69b89433c3be1_5.webp', 0, '2026-03-16 20:37:23'),
(6, 2, '69b89433c5388_4.jpg', 0, '2026-03-16 20:37:23'),
(10, 10, '1775245533997-1.png', 1, '2026-04-03 16:45:34'),
(11, 11, '1775246738552-2.webp', 1, '2026-04-03 17:05:38'),
(12, 11, '1775246738554-1.png', 1, '2026-04-03 17:05:38'),
(13, 3, '1775247166712-2.webp', 1, '2026-04-03 17:12:46'),
(14, 4, '1775247192828-2.webp', 1, '2026-04-03 17:13:12'),
(15, 3, '1775259774391-2.webp', 0, '2026-04-03 20:42:54'),
(16, 3, '1775259774394-1.png', 0, '2026-04-03 20:42:54'),
(17, 3, '1775259786744-2.webp', 0, '2026-04-03 20:43:06'),
(18, 3, '1775259786745-1.png', 0, '2026-04-03 20:43:06'),
(19, 4, '1775259792845-2.webp', 0, '2026-04-03 20:43:12'),
(20, 4, '1775259792845-1.png', 0, '2026-04-03 20:43:12');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `documento` varchar(20) DEFAULT NULL,
  `status` char(1) DEFAULT 'A',
  `dataCadastro` datetime DEFAULT current_timestamp(),
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil` char(1) DEFAULT 'O'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `documento`, `status`, `dataCadastro`, `telefone`, `email`, `senha`, `perfil`) VALUES
(1, 'Emerson de Carvalho', '', 'A', '2026-02-20 11:49:48', '(19) 98108-2383', 'emersoncarvalho@hotmail.com.br', '$2y$10$Ucqnam1exgfouPmg6zKHPOnpi7Qc3h/vGlZcb1cCdoiDCQxL1149O', 'A'),
(2, 'Emerson 0', '', 'A', '2026-03-16 20:34:34', '(19) 98108-2383', 'emerson@gmail.com', '$2b$10$mmke8AEoNPSEZ5egdTNYyeJzENTPEReRGupBdzj9cLu/DPXVN.1pe', 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_historico`
--

CREATE TABLE `usuarios_historico` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `campo` varchar(100) DEFAULT NULL,
  `antes` text DEFAULT NULL,
  `depois` text DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp(),
  `alterado_por` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `data_pedido` datetime NOT NULL,
  `forma_pagamento` varchar(20) DEFAULT NULL,
  `parcelas` int(11) DEFAULT 1,
  `intervalo` int(11) DEFAULT 30,
  `valor_total` decimal(10,2) DEFAULT 0.00,
  `status` char(1) DEFAULT 'A',
  `st_registro` char(1) DEFAULT 'A',
  `data_cadastro` datetime DEFAULT current_timestamp(),
  `pedido_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vendas`
--

INSERT INTO `vendas` (`id`, `cliente_id`, `data_pedido`, `forma_pagamento`, `parcelas`, `intervalo`, `valor_total`, `status`, `st_registro`, `data_cadastro`, `pedido_id`) VALUES
(1, 1, '2026-03-16 21:24:00', 'PRAZO', 2, 30, '2500.00', 'A', 'A', '2026-03-16 21:24:45', NULL),
(2, 1, '2026-03-21 00:30:28', 'PIX', 1, 30, '2500.00', 'A', 'A', '2026-03-20 21:30:28', NULL),
(3, 2, '2026-03-21 00:30:55', 'PIX', 1, 30, '130.00', 'A', 'A', '2026-03-20 21:30:56', NULL),
(4, 6, '2026-03-21 00:34:00', 'PRAZO', 2, 30, '2630.00', 'A', 'A', '2026-03-20 21:34:52', NULL),
(5, 1, '2026-04-07 19:35:09', 'PRAZO', 1, 30, '1500.00', 'A', 'A', '2026-04-07 19:35:09', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas_historico`
--

CREATE TABLE `vendas_historico` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `campo` varchar(100) DEFAULT NULL,
  `antes` text DEFAULT NULL,
  `depois` text DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vendas_historico`
--

INSERT INTO `vendas_historico` (`id`, `venda_id`, `usuario`, `campo`, `antes`, `depois`, `data`) VALUES
(1, 4, 'Emerson de Carvalho', 'itens', 'Itens anteriores', 'Itens alterados', '2026-03-20 21:35:07'),
(2, 4, 'Emerson de Carvalho', 'forma_pagamento', 'PIX', 'PRAZO', '2026-03-20 21:35:47'),
(3, 4, 'Emerson de Carvalho', 'itens', 'Itens anteriores', 'Itens alterados', '2026-03-20 21:35:47');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas_itens`
--

CREATE TABLE `vendas_itens` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `quantidade` decimal(10,2) NOT NULL,
  `valor_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vendas_itens`
--

INSERT INTO `vendas_itens` (`id`, `venda_id`, `produto_id`, `quantidade`, `valor_unitario`, `subtotal`) VALUES
(1, 1, 1, '1.00', '2500.00', '2500.00'),
(2, 2, 1, '1.00', '2500.00', '2500.00'),
(3, 3, 2, '1.00', '130.00', '130.00'),
(7, 4, 1, '1.00', '2500.00', '2500.00'),
(8, 4, 2, '1.00', '130.00', '130.00'),
(9, 5, 3, '1.00', '1500.00', '1500.00');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Índices para tabela `cliente_logs`
--
ALTER TABLE `cliente_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Índices para tabela `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_compras_fornecedores` (`fornecedores_id`);

--
-- Índices para tabela `compras_historico`
--
ALTER TABLE `compras_historico`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `compras_itens`
--
ALTER TABLE `compras_itens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_compras_itens_compra` (`compra_id`),
  ADD KEY `fk_compras_itens_produto` (`produto_id`);

--
-- Índices para tabela `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_item_tipo` (`item_id`,`tipo_estoque`);

--
-- Índices para tabela `estoque_movimentos`
--
ALTER TABLE `estoque_movimentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Índices para tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Índices para tabela `fornecedor_logs`
--
ALTER TABLE `fornecedor_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fornecedor_id` (`fornecedor_id`);

--
-- Índices para tabela `pedidos_catalogo`
--
ALTER TABLE `pedidos_catalogo`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `pedidos_catalogo_itens`
--
ALTER TABLE `pedidos_catalogo_itens`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Índices para tabela `produtos_historico`
--
ALTER TABLE `produtos_historico`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produtos_imagens`
--
ALTER TABLE `produtos_imagens`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuarios_historico`
--
ALTER TABLE `usuarios_historico`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendas_cliente` (`cliente_id`);

--
-- Índices para tabela `vendas_historico`
--
ALTER TABLE `vendas_historico`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `vendas_itens`
--
ALTER TABLE `vendas_itens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vendas_itens_venda` (`venda_id`),
  ADD KEY `fk_vendas_itens_produto` (`produto_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `cliente_logs`
--
ALTER TABLE `cliente_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `compras_historico`
--
ALTER TABLE `compras_historico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `compras_itens`
--
ALTER TABLE `compras_itens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `estoque`
--
ALTER TABLE `estoque`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `estoque_movimentos`
--
ALTER TABLE `estoque_movimentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `fornecedor_logs`
--
ALTER TABLE `fornecedor_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `pedidos_catalogo`
--
ALTER TABLE `pedidos_catalogo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `pedidos_catalogo_itens`
--
ALTER TABLE `pedidos_catalogo_itens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `produtos_historico`
--
ALTER TABLE `produtos_historico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `produtos_imagens`
--
ALTER TABLE `produtos_imagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `usuarios_historico`
--
ALTER TABLE `usuarios_historico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `vendas_historico`
--
ALTER TABLE `vendas_historico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `vendas_itens`
--
ALTER TABLE `vendas_itens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `cliente_logs`
--
ALTER TABLE `cliente_logs`
  ADD CONSTRAINT `cliente_logs_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `fk_compras_fornecedores` FOREIGN KEY (`fornecedores_id`) REFERENCES `fornecedores` (`id`);

--
-- Limitadores para a tabela `compras_itens`
--
ALTER TABLE `compras_itens`
  ADD CONSTRAINT `fk_compras_itens_compra` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`),
  ADD CONSTRAINT `fk_compras_itens_produto` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`);

--
-- Limitadores para a tabela `estoque_movimentos`
--
ALTER TABLE `estoque_movimentos`
  ADD CONSTRAINT `estoque_movimentos_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `produtos` (`id`);

--
-- Limitadores para a tabela `fornecedor_logs`
--
ALTER TABLE `fornecedor_logs`
  ADD CONSTRAINT `fornecedor_logs_ibfk_1` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedores` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Limitadores para a tabela `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `fk_vendas_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);

--
-- Limitadores para a tabela `vendas_itens`
--
ALTER TABLE `vendas_itens`
  ADD CONSTRAINT `fk_vendas_itens_produto` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`),
  ADD CONSTRAINT `fk_vendas_itens_venda` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
