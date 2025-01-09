-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Jan 2025 pada 15.51
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelapp`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `flights`
--

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `id_maskapai` int(11) NOT NULL,
  `date_departure` datetime NOT NULL,
  `date_arrival` datetime NOT NULL,
  `city_departure` int(11) NOT NULL,
  `city_arrival` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `baggage` int(11) NOT NULL,
  `is_cabin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `flights`
--

INSERT INTO `flights` (`id`, `id_maskapai`, `date_departure`, `date_arrival`, `city_departure`, `city_arrival`, `price`, `baggage`, `is_cabin`) VALUES
(1, 1, '2025-01-19 09:10:00', '2025-01-19 10:05:00', 2, 3, 1200000, 20, 1),
(2, 4, '2025-01-19 21:54:59', '2025-01-19 10:50:59', 1, 2, 1120000, 15, 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_departure_city` (`city_departure`),
  ADD KEY `FK_arrival_city` (`city_arrival`),
  ADD KEY `id_maskapai` (`id_maskapai`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `FK_arrival_city` FOREIGN KEY (`city_arrival`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `FK_departure_city` FOREIGN KEY (`city_departure`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`id_maskapai`) REFERENCES `maskapai` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
