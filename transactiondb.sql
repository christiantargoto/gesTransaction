-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 22 mai 2025 à 16:01
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `transactiondb`
--

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_compte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `nom`, `numero_compte`, `created_at`, `updated_at`) VALUES
(5, 'ZOUTIBE JULIEN KAGONBE', '556019', '2025-05-21 10:11:33', '2025-05-21 13:49:57'),
(3, 'SERGE MATURIN', '566009', '2025-05-21 09:53:39', '2025-05-21 09:53:39'),
(4, 'URCILE MENDJIPI INES', '678075', '2025-05-21 09:54:57', '2025-05-21 10:10:48'),
(6, 'FATIME IBRAHIM', '344055', '2025-05-21 10:14:44', '2025-05-21 10:14:44'),
(8, 'ALAIN TRAORE', '544003', '2025-05-21 12:47:14', '2025-05-21 12:47:14'),
(12, 'ISSA OUMAR NOURENE', '990567', '2025-05-21 14:05:19', '2025-05-21 14:05:19'),
(10, 'MBAIBAREM ANACLET', '567001', '2025-05-21 13:52:42', '2025-05-21 13:52:42'),
(11, 'RYAN TAYREL', '111009', '2025-05-21 14:02:44', '2025-05-21 14:03:24'),
(13, 'ARIEL DOUGLAS', '989002', '2025-05-21 14:38:20', '2025-05-21 14:38:20'),
(14, 'DAOUD ADOUM', '121004', '2025-05-21 14:38:43', '2025-05-21 14:38:43'),
(15, 'ALTEBAYE NARCISSE', '101005', '2025-05-21 14:39:18', '2025-05-21 14:39:18'),
(16, 'NEKARNOUDJI CELIA', '901003', '2025-05-21 14:40:20', '2025-05-21 14:40:20'),
(21, 'AHMAT FAROUK', '878055', '2025-05-22 14:00:40', '2025-05-22 14:00:40'),
(18, 'KHAUM ELVIS LE DJIMBAYE', '978006', '2025-05-22 07:51:26', '2025-05-22 07:54:16'),
(19, 'ABAKAR MAHAMAT AHMAT', '787003', '2025-05-22 07:52:27', '2025-05-22 07:52:27'),
(20, 'NGUEDOUBOUM TATIGA ROLAND', '678009', '2025-05-22 07:52:58', '2025-05-22 07:56:12'),
(22, 'TARGOTO CHRISTIAN', '100200', '2025-05-22 14:12:10', '2025-05-22 14:12:10'),
(23, 'FARIKOU OUSMANE', '600100', '2025-05-22 14:23:58', '2025-05-22 14:23:58'),
(24, 'MOKTAR MAHAMAT TAHIR', '459002', '2025-05-22 14:26:10', '2025-05-22 14:26:10');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_05_21_101843_create_clients_table', 1),
(6, '2025_05_22_091527_create_transactions_table', 2);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero_compte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('versement','retrait') COLLATE utf8mb4_unicode_ci NOT NULL,
  `montant` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transactions_numero_compte_foreign` (`numero_compte`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `numero_compte`, `type`, `montant`, `created_at`, `updated_at`) VALUES
(1, '978006', 'versement', 95000.00, '2025-05-22 08:34:33', '2025-05-22 08:34:33'),
(2, '678009', 'versement', 125000.00, '2025-05-22 08:36:46', '2025-05-22 08:36:46'),
(3, '901003', 'versement', 85000.00, '2025-05-22 08:37:52', '2025-05-22 08:37:52'),
(4, '121004', 'versement', 350000.00, '2025-05-22 08:39:02', '2025-05-22 08:39:02'),
(5, '989002', 'versement', 575000.00, '2025-05-22 08:39:50', '2025-05-22 08:39:50'),
(6, '678009', 'retrait', 100000.00, '2025-05-22 08:41:04', '2025-05-22 08:41:04'),
(7, '556019', 'versement', 450000.00, '2025-05-22 09:14:57', '2025-05-22 09:14:57'),
(8, '678009', 'versement', 15000.00, '2025-05-22 09:22:08', '2025-05-22 09:22:08'),
(9, '678075', 'versement', 225000.00, '2025-05-22 10:13:56', '2025-05-22 10:13:56'),
(10, '344055', 'versement', 455000.00, '2025-05-22 10:19:29', '2025-05-22 10:19:29'),
(12, '878055', 'retrait', 5000.00, '2025-05-22 14:01:11', '2025-05-22 14:01:11'),
(13, '878055', 'versement', 78000.00, '2025-05-22 14:02:11', '2025-05-22 14:02:11'),
(14, '100200', 'versement', 79000.00, '2025-05-22 14:15:18', '2025-05-22 14:15:18'),
(15, '100200', 'retrait', 200000.00, '2025-05-22 14:15:46', '2025-05-22 14:15:46'),
(16, '100200', 'versement', 340000.00, '2025-05-22 14:22:29', '2025-05-22 14:22:29'),
(17, '459002', 'versement', 278000.00, '2025-05-22 14:28:47', '2025-05-22 14:28:47'),
(18, '459002', 'retrait', 10000.00, '2025-05-22 14:29:16', '2025-05-22 14:29:16');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
