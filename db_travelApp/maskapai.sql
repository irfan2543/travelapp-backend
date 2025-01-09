-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Jan 2025 pada 15.52
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
-- Struktur dari tabel `maskapai`
--

CREATE TABLE `maskapai` (
  `id` int(11) NOT NULL,
  `nama_maskapai` varchar(255) NOT NULL,
  `iata_code` char(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `maskapai`
--

INSERT INTO `maskapai` (`id`, `nama_maskapai`, `iata_code`) VALUES
(1, 'Garuda Indonesia', 'GA'),
(2, 'Lion Air', 'JT'),
(3, 'Air Asia Indonesia', 'QZ'),
(4, 'Citilink', 'QG'),
(5, 'Batik Air', 'ID');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `maskapai`
--
ALTER TABLE `maskapai`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
