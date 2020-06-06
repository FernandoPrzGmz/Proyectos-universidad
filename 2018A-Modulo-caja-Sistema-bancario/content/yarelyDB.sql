-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-05-2018 a las 10:55:29
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yarelyDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caja`
--

CREATE TABLE `caja` (
  `id_caja` int(11) NOT NULL,
  `estatus` enum('ACTIVO','INACTIVO') COLLATE utf8_bin NOT NULL,
  `fecha_alta` datetime NOT NULL,
  `id_usuario_asignado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `caja`
--

INSERT INTO `caja` (`id_caja`, `estatus`, `fecha_alta`, `id_usuario_asignado`) VALUES
(0, 'ACTIVO', '2018-05-24 00:00:00', 3),
(1, 'ACTIVO', '2018-04-03 00:00:00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_paises`
--

CREATE TABLE `cat_paises` (
  `id_pais` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `cat_paises`
--

INSERT INTO `cat_paises` (`id_pais`, `nombre`) VALUES
(1, 'Mexico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `id_cuenta` int(11) NOT NULL,
  `numero` varchar(10) COLLATE utf8_bin NOT NULL,
  `balance` float NOT NULL,
  `detalles` text COLLATE utf8_bin NOT NULL,
  `fecha_alta` datetime NOT NULL,
  `estatus` enum('ACTIVA','INACTIVA') COLLATE utf8_bin NOT NULL,
  `tipo` enum('CHEQUES','AHORROS') COLLATE utf8_bin NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`id_cuenta`, `numero`, `balance`, `detalles`, `fecha_alta`, `estatus`, `tipo`, `id_usuario`) VALUES
(1, '100', 3975, 'detalles', '2018-04-28 00:00:00', 'ACTIVA', 'AHORROS', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `contrato_fecha_inicio` date NOT NULL,
  `contrato_fecha_fin` date NOT NULL,
  `sueldo` float NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `id_tarjeta` int(11) NOT NULL,
  `numero` varchar(16) COLLATE utf8_bin NOT NULL,
  `pin` varchar(4) COLLATE utf8_bin NOT NULL,
  `codigo_seguridad` varchar(3) COLLATE utf8_bin NOT NULL,
  `fecha_validez_inicio` date NOT NULL,
  `fecha_validez_fin` date NOT NULL,
  `estatus` enum('ACTIVO','INACTIVO') COLLATE utf8_bin NOT NULL,
  `id_cuenta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`id_tarjeta`, `numero`, `pin`, `codigo_seguridad`, `fecha_validez_inicio`, `fecha_validez_fin`, `estatus`, `id_cuenta`) VALUES
(1, '1234567890123456', '3210', '001', '2018-04-28', '2018-09-20', 'ACTIVO', 1),
(2, '6543210987654321', '3210', '123', '2018-04-18', '2018-09-11', 'ACTIVO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `id_telefono` int(11) NOT NULL,
  `numero` varchar(45) COLLATE utf8_bin NOT NULL,
  `tipo` enum('MOVIL,FIJO') COLLATE utf8_bin NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `id_transaccion` int(11) NOT NULL,
  `folio` varchar(25) COLLATE utf8_bin NOT NULL,
  `fecha` datetime NOT NULL,
  `monto` float NOT NULL,
  `detalles` text COLLATE utf8_bin NOT NULL,
  `tipo` enum('DEPOSITO','RETIRO','PAGO') COLLATE utf8_bin NOT NULL,
  `id_caja` int(11) NOT NULL,
  `id_tarjeta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL,
  `correo` varchar(45) COLLATE utf8_bin NOT NULL,
  `username` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(254) COLLATE utf8_bin NOT NULL,
  `estatus` enum('ACTIVO','INACTIVO') COLLATE utf8_bin NOT NULL,
  `tipo` enum('CLIENTE','EJECUTIVO','ADMINISTRADOR') COLLATE utf8_bin NOT NULL,
  `fecha_alta` datetime NOT NULL,
  `direccion` text COLLATE utf8_bin NOT NULL,
  `sexo` enum('MASCULINO','FEMENINO') COLLATE utf8_bin NOT NULL,
  `rfc` varchar(45) COLLATE utf8_bin NOT NULL,
  `curp` varchar(45) COLLATE utf8_bin NOT NULL,
  `usuario_alta` int(11) DEFAULT NULL,
  `id_pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `correo`, `username`, `password`, `estatus`, `tipo`, `fecha_alta`, `direccion`, `sexo`, `rfc`, `curp`, `usuario_alta`, `id_pais`) VALUES
(1, 'Fernando', 'hola@gmail.com', 'hola', 'holahola', 'ACTIVO', 'CLIENTE', '2018-04-28 00:00:00', 'holahola', 'MASCULINO', 'holahola', 'holahola', 0, 1),
(2, 'Pedrito Sola', 'p@gmai.com', 'mayonesa', 'mayonesa', 'ACTIVO', 'EJECUTIVO', '2018-04-16 00:00:00', 'direccion', 'MASCULINO', 'mayonesa', 'mayonesa', 321, 1),
(3, 'Luis Vargas Guerrero', 'luis@gmail.com', 'luis', 'luis', 'ACTIVO', 'EJECUTIVO', '2018-05-29 00:00:00', 'direccion', 'MASCULINO', 'rfc', 'curp', 123, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `caja`
--
ALTER TABLE `caja`
  ADD PRIMARY KEY (`id_caja`),
  ADD KEY `fkIdx_331` (`id_usuario_asignado`);

--
-- Indices de la tabla `cat_paises`
--
ALTER TABLE `cat_paises`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`id_cuenta`),
  ADD KEY `fkIdx_379` (`id_usuario`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `fkIdx_340` (`id_usuario`);

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`id_tarjeta`),
  ADD KEY `fkIdx_231` (`id_cuenta`);

--
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`id_telefono`),
  ADD KEY `fkIdx_373` (`id_usuario`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`id_transaccion`),
  ADD KEY `fkIdx_162` (`id_caja`),
  ADD KEY `fkIdx_235` (`id_tarjeta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fkIdx_383` (`id_pais`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  MODIFY `id_transaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `caja`
--
ALTER TABLE `caja`
  ADD CONSTRAINT `FK_331` FOREIGN KEY (`id_usuario_asignado`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD CONSTRAINT `FK_379` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `FK_340` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD CONSTRAINT `FK_231` FOREIGN KEY (`id_cuenta`) REFERENCES `cuenta` (`id_cuenta`);

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `FK_373` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD CONSTRAINT `FK_162` FOREIGN KEY (`id_caja`) REFERENCES `caja` (`id_caja`),
  ADD CONSTRAINT `FK_235` FOREIGN KEY (`id_tarjeta`) REFERENCES `tarjeta` (`id_tarjeta`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_383` FOREIGN KEY (`id_pais`) REFERENCES `cat_paises` (`id_pais`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
