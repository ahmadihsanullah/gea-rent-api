-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20221117.561d9ca705
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2023 at 06:00 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gea_rent_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`) VALUES
(0, 'admingearent', 'admingearent@gmail.com', 'Gearent12');

-- --------------------------------------------------------

--
-- Table structure for table `alamat`
--

CREATE TABLE `alamat` (
  `id` int(11) NOT NULL,
  `jalan` varchar(255) DEFAULT NULL,
  `kota` varchar(255) DEFAULT NULL,
  `provinsi` varchar(255) DEFAULT NULL,
  `kode_pos` varchar(10) DEFAULT NULL,
  `negara` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alamat`
--

INSERT INTO `alamat` (`id`, `jalan`, `kota`, `provinsi`, `kode_pos`, `negara`) VALUES
(1, 'Jln. Raya Kemang Baru Setu', 'Bogor', 'Jawa Barat', '16320', 'Indonesia'),
(2, 'Jl. Babakan Lio No.29, RT.02/RW.09, Balungbangjaya, Kec. Bogor Barat', 'Bogor', 'Jawa Barat', '16116', 'Indonesia'),
(3, 'Jl. KH. Nawawi No.69, Cirimekar, Kec. Cibinong, Kabupaten Bogor', 'Bogor', 'Jawa Barat', '16917', 'Indonesia');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `toko_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama`, `deskripsi`, `harga`, `stok`, `toko_id`) VALUES
(1, 'Tenda', 'Tenda outdoor yang tangguh dan ringan, cocok untuk petualangan luar ruangan dengan desain portabel yang praktis dan fungsional', 40000, 5, 1),
(2, 'Sepatu Gunung', 'Sepatu gunung kokoh dan nyaman, dirancang untuk melibas medan ekstrem dengan daya tahan tinggi dan desain ergonomis', 30000, 10, 2),
(3, 'Kompor Portable', 'Kompor portable praktis dan mudah dibawa, cocok untuk kegiatan luar ruangan. Desain ringkas, ringan, dan efisien untuk memasak di mana saja', 30000, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `gambar_barang`
--

CREATE TABLE `gambar_barang` (
  `id` int(11) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `kode_barang_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gambar_barang`
--

INSERT INTO `gambar_barang` (`id`, `gambar`, `kode_barang_id`) VALUES
(1, 'tenda-eiger.jpg', 1),
(2, 'sepatu-consina.png', 2),
(3, 'kompor-portable.png', 3);

-- --------------------------------------------------------

--
-- Table structure for table `panduan`
--

CREATE TABLE `panduan` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tokos`
--

CREATE TABLE `tokos` (
  `kode_toko` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `id_alamat` int(11) DEFAULT NULL,
  `no_telepon` varchar(255) DEFAULT NULL,
  `profile_toko` varchar(255) DEFAULT NULL,
  `username_user` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tokos`
--

INSERT INTO `tokos` (`kode_toko`, `nama`, `email`, `id_alamat`, `no_telepon`, `profile_toko`, `username_user`) VALUES
(1, 'Bandakala Rental', 'bandakalarental@gmail.com', 1, '0895263478123', 'bandakala-logo.jpg', 'ahmad'),
(2, 'Cirrus Outdoor', 'cirrusoutdoor@gmail.com', 2, '0812145234332', 'cirrusoudoor-logo.jpg', 'dandi'),
(3, 'Lentera Outdoor', 'lenteraout@gmail.com', 3, '0859273648594', 'Lentera-logo.png', 'Fakhri');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `status_toko` tinyint(1) DEFAULT 0,
  `profile` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `name`, `token`, `status_toko`, `profile`, `created_at`, `updated_at`) VALUES
('ahmad', '$2b$10$bkZxxx7nXL6aaB5O3Qi/Cu0vFS54.jBKnaGNv9Ex5FSHihS6lVug6', 'Ahmad Ihsanullah', 'b16076c7-ca05-4b2b-b7f4-8b2918de61af', 1, '1702912214633-sttnf.png', '2023-12-20', '2023-12-22'),
('dandi', '$2b$10$9XMHh1.zcvGmVh4gUHOiz.jO/IfkJPaUp6OlMzqqGgYwlmRn5d29.', 'Dandi', 'e48e64f0-a44d-4a9f-b1c7-6548da9a261c', 1, '1703094318518-dandi.jpeg', '2023-12-20', '2023-12-20'),
('Fakhri', '$2b$10$uDWSPHrfcErwOHEUjzsWfu9JKs7K6BXP1hGfLguK1nqmXyLpFnmqO', 'Fakhri', '621cbcfd-4342-4e60-a1f3-a8150477c1a2', 1, '1703094044897-logo-gearent.png', '2023-12-21', '2023-12-21'),
('raka', '$2b$10$m/4iYZVLsxo3lo7/lKYxOeEzLPNxLRrXhjuAJkm2ouUNK1Zt6.qfa', 'Raka Yogaswara', '6da63bf7-850b-4c8d-b5e4-b75653d68f69', 0, '1703094203203-sttnf.png', '2023-12-21', '2023-12-21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `alamat`
--
ALTER TABLE `alamat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barang_ibfk_1` (`toko_id`);

--
-- Indexes for table `gambar_barang`
--
ALTER TABLE `gambar_barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gambar_barang_ibfk_1` (`kode_barang_id`);

--
-- Indexes for table `panduan`
--
ALTER TABLE `panduan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokos`
--
ALTER TABLE `tokos`
  ADD PRIMARY KEY (`kode_toko`),
  ADD KEY `tokos_ibfk_1` (`id_alamat`),
  ADD KEY `tokos_ibfk_2` (`username_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alamat`
--
ALTER TABLE `alamat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tokos`
--
ALTER TABLE `tokos`
  MODIFY `kode_toko` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`toko_id`) REFERENCES `tokos` (`kode_toko`) ON UPDATE CASCADE;

--
-- Constraints for table `gambar_barang`
--
ALTER TABLE `gambar_barang`
  ADD CONSTRAINT `gambar_barang_ibfk_1` FOREIGN KEY (`kode_barang_id`) REFERENCES `barang` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `tokos`
--
ALTER TABLE `tokos`
  ADD CONSTRAINT `tokos_ibfk_1` FOREIGN KEY (`id_alamat`) REFERENCES `alamat` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tokos_ibfk_2` FOREIGN KEY (`username_user`) REFERENCES `users` (`username`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
