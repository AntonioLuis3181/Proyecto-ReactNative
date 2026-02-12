-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 10-02-2026 a las 18:50:08
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `elearning_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `horas` int DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `id_plataforma` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `titulo`, `precio`, `horas`, `fecha_publicacion`, `imagen_url`, `id_plataforma`) VALUES
(1, 'Curso de React (Editado)', 9.99, 45, '2023-10-01', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', 1),
(2, 'Máster en Python', 0.00, 45, '2023-09-15', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png', 3),
(3, 'Docker para Principiantes', 29.50, 10, '2024-01-10', 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png', 2),
(7, 'JAVA', 0.00, 50, '2026-01-27', 'https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)#/media/Archivo:Duke_(Java_mascot)_waving.svg', 7),
(8, 'SQL ', 20.00, 85, '2026-01-27', 'https://commons.wikimedia.org/wiki/File:Sql_data_base_with_logo.svg', 8),
(9, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(10, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(11, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(12, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(13, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(14, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(15, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(20, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(21, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(22, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(23, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(24, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(25, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(26, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(31, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(32, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(33, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(34, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(35, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(36, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(37, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1),
(42, 'Curso de React Avanzado', 19.99, 40, '2024-02-01', 'https://via.placeholder.com/150', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataformas`
--

CREATE TABLE `plataformas` (
  `id_plataforma` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `url_web` varchar(255) DEFAULT NULL,
  `es_gratuita` tinyint(1) DEFAULT '0',
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `plataformas`
--

INSERT INTO `plataformas` (`id_plataforma`, `nombre`, `url_web`, `es_gratuita`, `fecha_alta`) VALUES
(1, 'Udemy', 'https://www.udemy.com', 0, '2026-01-20 16:38:35'),
(2, 'Coursera', 'https://www.coursera.org', 0, '2026-01-20 00:00:00'),
(3, 'YouTube', 'https://www.youtube.com', 1, '2026-01-20 16:38:35'),
(7, 'Moodle', 'https://moodle.org/?lang=es', 1, '2026-01-27 00:00:00'),
(8, 'OpenWebinars', 'https://openwebinars.net/', 0, '2026-01-27 00:00:00'),
(9, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(10, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(11, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(12, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(13, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(14, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(18, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(19, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(20, 'Plataforma Nueva Test', 'https://www.validurl.com', 1, '2024-01-27 00:00:00'),
(21, 'Plataforma Nueva Test', 'https://www.test.com', 0, '2024-01-27 00:00:00'),
(22, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(23, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(24, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(25, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(26, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(30, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(31, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(32, 'Plataforma Nueva Test', 'https://www.validurl.com', 1, '2024-01-27 00:00:00'),
(33, 'Plataforma Nueva Test', 'https://www.test.com', 0, '2024-01-27 00:00:00'),
(34, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(35, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(36, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(37, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(38, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(42, 'Plataforma Nueva Test', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(43, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'https://www.test.com', 1, '2024-01-27 00:00:00'),
(44, 'Plataforma Nueva Test', 'https://www.validurl.com', 1, '2024-01-27 00:00:00'),
(45, 'Plataforma Nueva Test', 'https://www.test.com', 0, '2024-01-27 00:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `fk_plataforma` (`id_plataforma`);

--
-- Indices de la tabla `plataformas`
--
ALTER TABLE `plataformas`
  ADD PRIMARY KEY (`id_plataforma`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `plataformas`
--
ALTER TABLE `plataformas`
  MODIFY `id_plataforma` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `fk_plataforma` FOREIGN KEY (`id_plataforma`) REFERENCES `plataformas` (`id_plataforma`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
