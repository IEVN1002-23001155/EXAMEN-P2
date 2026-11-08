-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2026 at 06:01 PM
-- Server version: 8.0.46
-- PHP Version: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `examen`
--

-- --------------------------------------------------------

--
-- Table structure for table `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id` int NOT NULL,
  `pedido_id` int NOT NULL,
  `tamano` varchar(50) NOT NULL,
  `ingredientes` varchar(100) NOT NULL,
  `num_pizzas` int NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id`, `pedido_id`, `tamano`, `ingredientes`, `num_pizzas`, `subtotal`) VALUES
(1, 1, 'Chica', 'Piña', 1, 50.00),
(2, 2, 'Grande', 'Champiñones', 1, 130.00),
(3, 3, 'Mediana', 'Piña, Champiñones', 1, 100.00),
(4, 3, 'Mediana', 'Jamon, Piña, Champiñones', 14, 1540.00),
(5, 4, 'Chica', 'Piña', 1, 50.00),
(6, 5, 'Mediana', 'Champiñones, Piña, Jamon', 4, 440.00),
(7, 6, 'Chica', 'Jamon, Piña, Champiñones', 10, 700.00),
(8, 7, 'Mediana', 'Jamón, Piña', 2, 200.00),
(9, 8, 'Mediana', 'Jamón, Piña', 21, 2100.00),
(10, 9, 'Mediana', 'Piña', 21, 1890.00),
(11, 10, 'Mediana', 'Piña', 21, 1890.00),
(12, 11, 'Chica', 'Piña', 1, 50.00),
(13, 12, 'Mediana', 'Piña', 1, 90.00),
(14, 12, 'Chica', 'Sin ingredientes extra', 1, 40.00),
(15, 12, 'Chica', 'Sin ingredientes extra', 1, 40.00),
(16, 12, 'Chica', 'Sin ingredientes extra', 1, 40.00),
(17, 13, 'Mediana', 'Piña, Champiñones', 4, 400.00);

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`id`, `nombre_cliente`, `direccion`, `telefono`, `fecha_pedido`, `total`) VALUES
(1, 'sad', 'dsadsas', '21123', '2222-02-21', 50.00),
(2, 'ewqeqww', 'eqqwqwe', '32312', '3232-02-12', 130.00),
(3, '323244', '4324432', '23432432', '0342-02-04', 1640.00),
(4, '32321', '32131', '321321', '0132-12-31', 50.00),
(5, 'dssa', 'asdasds', '34133', '1233-02-13', 440.00),
(6, 'rewew', 'rewrerew', 'rerewerw', '3131-03-12', 700.00),
(7, 'ewwq', 'eqwewwqe', '3121231', '0313-03-12', 200.00),
(8, '1233', '2313', '12321312', '2026-11-12', 2100.00),
(9, '2222', '2222', '2222222222', '2222-02-22', 1890.00),
(10, '1222222', '22222222222', '222222222222222222', '1111-11-21', 1890.00),
(11, '12132', '1231', '3131', '0013-02-21', 50.00),
(12, '321312', '2133', '31212', '0233-02-21', 210.00),
(13, '13232132', '2131232', '131231312', '0021-03-21', 400.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
