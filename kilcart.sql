-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2024 at 08:45 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kilcart`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_address`
--

CREATE TABLE `tbl_address` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `country_code` varchar(10) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `address_type` enum('Home','Office') DEFAULT 'Home',
  `defaultAddress` varchar(50) NOT NULL DEFAULT 'false',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_address`
--

INSERT INTO `tbl_address` (`address_id`, `user_id`, `full_name`, `country_code`, `contact_number`, `address_line1`, `address_line2`, `landmark`, `city`, `state`, `country`, `zip_code`, `address_type`, `defaultAddress`, `created_at`, `updated_at`) VALUES
(1, 15, 'Kilvish  Birla ', '+91', '9039568219', 'Sairam Plaza , Mangal Nagar ', '2nd Floor , 206 office ', 'office number 206', 'Indore', 'MP ', 'India', '452001', 'Home', 'false', '2023-11-27 12:15:30', '2024-01-03 17:19:36'),
(2, 15, 'Vasu Birla', '91', '9000000', 'Sairam Plaza', 'office 206 ', 'oye pape hotel ', 'Indore', 'MP', 'India', '451111', 'Office', 'false', '2024-01-03 12:35:08', '2024-01-03 12:35:08'),
(3, 1, 'SHIVA P', '91', '939568219', 'Sai Ram plaza ', 'oye pape ', 'MATA GUJRI ', 'Indore', 'MP', 'India', '452001', 'Office', 'true', '2024-01-03 13:38:49', '2024-01-03 17:19:41'),
(4, 1, 'SHIVA P', '91', '939568219', 'Sai Ram plaza ', 'oye pape ', 'MATA GUJRI ', 'Indore', 'MP', '5454', 'Indore', 'Home', 'false', '2024-01-03 13:50:05', '2024-01-03 13:50:05');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `about` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  `date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `firstname`, `lastname`, `email`, `username`, `password`, `contact`, `about`, `address`, `image`, `imagePath`, `date`) VALUES
(1, 'Kilvish', 'Ciss', 'vasubirla007@gmail.com', 'admin', '123456', '1234567890', 'CISS Invoice Management System can be a robust and useful addition, allowing administrators to manage users, invoices, and other essential functions. Below are some key features and considerations for your admin panel:', 'Sai Ram Plaza, 210, Mangal Nagar Road', 'img_img_img_tonystark.jpg_1695896636587.jpg_1696068411932.jpg_1696233190364.jpg', 'public\\uploads\\img_img_img_tonystark.jpg_1695896636587.jpg_1696068411932.jpg_1696233190364.jpg', '2023-08-14 12:15:42.000000');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_itemsorders`
--

CREATE TABLE `tbl_itemsorders` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_itemsorders`
--

INSERT INTO `tbl_itemsorders` (`order_item_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(23, 15, 5, 1, '10.00'),
(24, 15, 2, 1, '10.00'),
(25, 15, 7, 1, '15.00'),
(26, 18, 5, 1, '10.00'),
(27, 18, 2, 1, '10.00'),
(28, 18, 7, 1, '15.00'),
(29, 19, 7, 1, '15.00'),
(30, 20, 7, 1, '15.00'),
(31, 22, 7, 1, '15.00'),
(32, 22, 2, 1, '10.00'),
(33, 23, 5, 1, '10.00'),
(34, 24, 5, 1, '10.00'),
(35, 25, 5, 1, '10.00'),
(36, 26, 7, 1, '15.00'),
(37, 27, 5, 1, '10.00'),
(38, 28, 2, 2, '10.00'),
(39, 29, 11, 1, '100.00'),
(40, 30, 2, 1, '10.00'),
(41, 31, 7, 1, '15.00'),
(42, 31, 5, 1, '10.00'),
(43, 32, 7, 1, '15.00'),
(44, 32, 5, 1, '10.00'),
(45, 33, 7, 1, '15.00'),
(46, 33, 5, 1, '10.00'),
(47, 34, 7, 1, '15.00'),
(48, 34, 5, 1, '10.00'),
(49, 35, 5, 1, '10.00'),
(50, 36, 5, 1, '10.00'),
(51, 37, 7, 1, '15.00'),
(52, 37, 5, 1, '10.00'),
(53, 38, 7, 1, '15.00'),
(54, 38, 5, 1, '10.00'),
(55, 39, 7, 1, '15.00'),
(56, 39, 5, 1, '10.00'),
(57, 40, 7, 1, '15.00'),
(58, 40, 5, 1, '10.00'),
(59, 41, 7, 1, '15.00'),
(60, 41, 5, 1, '10.00'),
(61, 42, 7, 1, '15.00'),
(62, 42, 5, 1, '10.00'),
(63, 43, 7, 1, '15.00'),
(64, 43, 5, 1, '10.00'),
(65, 44, 7, 1, '15.00'),
(66, 44, 5, 1, '10.00'),
(67, 45, 5, 1, '10.00'),
(68, 46, 5, 1, '10.00'),
(69, 47, 2, 1, '10.00'),
(70, 48, 7, 1, '15.00'),
(71, 49, 5, 1, '10.00'),
(72, 49, 7, 1, '15.00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `order_items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`order_items`)),
  `total_amount` decimal(10,2) DEFAULT NULL,
  `currency` varchar(50) NOT NULL DEFAULT 'INR',
  `payment_status` varchar(50) DEFAULT 'Pending',
  `order_status` enum('Pending','Placed','Dispatched','OnTheWay','Delivered') DEFAULT 'Pending',
  `payment_method` varchar(50) DEFAULT 'CASE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`order_id`, `user_id`, `address_id`, `order_items`, `total_amount`, `currency`, `payment_status`, `order_status`, `payment_method`, `created_at`, `updated_at`) VALUES
(15, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\"},{\"product_id\":2,\"quantity\":1,\"price\":\"10.00\"},{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\"}]', '36.75', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 09:43:14', '2024-01-04 09:43:14'),
(18, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\"},{\"product_id\":2,\"quantity\":1,\"price\":\"10.00\"},{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\"}]', '36.75', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 09:49:14', '2024-01-04 09:49:14'),
(19, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\"}]', '15.75', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 09:54:42', '2024-01-04 09:54:42'),
(20, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\"}]', '15.75', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 10:00:49', '2024-01-04 10:00:49'),
(22, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":2,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 10:33:43', '2024-01-04 10:33:43'),
(23, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 10:34:02', '2024-01-04 10:34:02'),
(24, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 10:39:34', '2024-01-04 10:39:34'),
(25, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 10:43:26', '2024-01-04 10:43:26'),
(26, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"}]', '15.75', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 10:45:54', '2024-01-04 10:45:54'),
(27, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 10:48:02', '2024-01-04 10:48:02'),
(28, 15, 3, '[{\"product_id\":2,\"quantity\":\"2\",\"price\":\"10.00\",\"currency\":\"INR\"}]', '21.00', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 13:50:28', '2024-01-04 13:50:28'),
(29, 15, 3, '[{\"product_id\":11,\"quantity\":1,\"price\":\"100.00\",\"currency\":\"INR\"}]', '105.00', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-04 13:55:44', '2024-01-04 13:55:44'),
(30, 15, 3, '[{\"product_id\":2,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-05 05:24:49', '2024-01-05 05:24:49'),
(31, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-05 09:25:56', '2024-01-05 09:25:56'),
(32, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-05 09:48:07', '2024-01-05 09:48:07'),
(33, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-05 09:55:43', '2024-01-05 09:55:43'),
(34, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-05 10:20:34', '2024-01-05 10:20:34'),
(35, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Pending', 'CASE', '2024-01-05 10:53:39', '2024-01-05 10:53:39'),
(36, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 10:55:24', '2024-01-05 11:03:23'),
(37, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 11:00:03', '2024-01-05 11:00:04'),
(38, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 11:33:19', '2024-01-05 11:35:22'),
(39, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 12:47:50', '2024-01-05 12:47:51'),
(40, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 13:07:15', '2024-01-05 13:07:16'),
(41, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 13:23:25', '2024-01-05 13:23:27'),
(42, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 13:40:52', '2024-01-05 13:40:53'),
(43, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 13:43:31', '2024-01-05 13:43:32'),
(44, 15, 3, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"},{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 13:44:23', '2024-01-05 13:44:24'),
(45, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-05 13:52:22', '2024-01-05 13:52:23'),
(46, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-06 06:34:28', '2024-01-06 06:34:29'),
(47, 15, 3, '[{\"product_id\":2,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"}]', '10.50', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-09 07:03:29', '2024-01-09 07:03:30'),
(48, 15, 1, '[{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"}]', '15.75', 'INR', 'Pending', 'Placed', 'CASE', '2024-01-23 08:29:59', '2024-01-23 08:30:00'),
(49, 15, 3, '[{\"product_id\":5,\"quantity\":1,\"price\":\"10.00\",\"currency\":\"INR\"},{\"product_id\":7,\"quantity\":1,\"price\":\"15.00\",\"currency\":\"INR\"}]', '26.25', 'INR', 'Pending', 'Placed', 'CASE', '2024-03-06 07:06:26', '2024-03-06 07:06:27');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(50) NOT NULL DEFAULT 'INR',
  `ratings` int(11) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `subcategory` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `numOfReviews` int(11) NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `reviews` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`reviews`)),
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`product_id`, `name`, `description`, `price`, `currency`, `ratings`, `category`, `subcategory`, `stock`, `numOfReviews`, `images`, `reviews`, `created_at`, `updated_at`) VALUES
(2, 'kil', 'killll', '10.00', 'INR', NULL, 'Electronics', 'Smartphones', 2, 0, '[{\"filename\":\"img_marvel2.webp_1700220934078.webp\"},{\"filename\":\"img_marvel3.webp_1700220934088.webp\"},{\"filename\":\"img_marvel4.webp_1700220934100.webp\"}]', NULL, '2023-11-17 17:05:34', '2023-11-17 17:05:34'),
(5, 'Cars', 'Monster Trucs', '10.00', 'INR', NULL, 'Toys', 'Action Figures', 2, 0, '[{\"filename\":\"img_toy1.jpg_1700221697488.jpg\"},{\"filename\":\"img_toy2.webp_1700221697496.webp\"}]', NULL, '2023-11-17 17:18:17', '2023-11-17 17:18:17'),
(7, 'Shield ', 'Captain\'s Shield ', '15.00', 'INR', NULL, 'Toys', 'Action Figures', 11, 0, '[{\"filename\":\"img_capShield.jpeg_1700831142409.jpeg\"}]', NULL, '2023-11-24 18:35:42', '2023-11-24 18:35:42'),
(8, 'Eye of Agamatto  , Dr. Strange', 'It can Reverse Time for perticualr  Object or Place . ', '100.00', 'INR', NULL, 'Toys', 'Action Figures', 5, 0, '[{\"filename\":\"img_eye-of-agamotto3-510x510.jpeg_1700832363061.jpeg\"}]', NULL, '2023-11-24 18:56:03', '2023-11-24 18:56:03'),
(9, 'Meomir Hammer  (Thor\'s Hammer )', 'Powerful Weapoun of Norse GOD Thor , Made by Broker Star  with Powerful Asguardian\'s Magic Metal ', '50.00', 'INR', NULL, 'Toys', 'Action Figures', 5, 0, '[{\"filename\":\"img_thor-hammer-prop-replica-510x510.jpg_1700832447997.jpg\"}]', NULL, '2023-11-24 18:57:28', '2023-11-24 18:57:28'),
(10, 'IronMan\'s Helmet ', 'Mark 50 \'s Helmet with Power control of Jarvis Satelite and AI .', '100.00', 'INR', NULL, 'Toys', 'Action Figures', 6, 0, '[{\"filename\":\"img_Metal-made-Iron-Man-MK42-helmet-510x487.jpg_1700832573790.jpg\"}]', NULL, '2023-11-24 18:59:33', '2023-11-24 18:59:33'),
(11, 'ssss', 'sss', '100.00', 'INR', NULL, 'Electronics', 'Smartphones', 10, 0, '[{\"filename\":\"img_ind n.jpg_1704376363447.jpg\"}]', NULL, '2024-01-04 19:22:43', '2024-01-04 19:22:43');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `address` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `email`, `password`, `gender`, `address`, `status`, `created_at`, `updated_at`) VALUES
(2, 'vishnu', 'user@gmail.com', '123456', 'male', 'adddd', 'active', '2023-11-02 13:11:20', '2024-01-04 19:25:16'),
(4, 'mahen', 'mahen@gmail.com', '123456', 'male', '123456', 'active', '2023-11-02 13:16:07', '2024-01-04 19:25:17'),
(15, 'vasubirla', 'vasubirla@gmail.com', '123456', 'male', 'Indore', 'active', '2023-11-20 18:28:15', '2024-01-04 19:25:18'),
(16, 'shivan', 'shivani@gmail.com', '123456', 'female', 'Khandwa', 'active', '2023-11-20 19:02:24', '2024-01-04 19:25:18'),
(18, 'kilvishbirla', 'kilvishbirla@gmail.com', '123456', 'male', 'Ajay Bagh Colony, Indore, 452001', 'active', '2024-03-06 13:12:14', '2024-03-06 13:12:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_address`
--
ALTER TABLE `tbl_address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_itemsorders`
--
ALTER TABLE `tbl_itemsorders`
  ADD PRIMARY KEY (`order_item_id`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_address`
--
ALTER TABLE `tbl_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_itemsorders`
--
ALTER TABLE `tbl_itemsorders`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
