CREATE DATABASE app;
USE app;
CREATE TABLE IF NOT EXISTS account (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  creaed_at date DEFAULT current_timestamp,
  last_login datetime DEFAULT current_timestamp()
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  status INT
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price float NOT NULL,
  sale_price float DEFAULT '0',
  image VARCHAR(200) NOT NULL,
  category_id int NOT NULL,
  status tinyint DEFAULT '1',
  description text NOT NULL,
  created_at date DEFAULT current_timestamp(),
  FOREIGN KEY (category_id) REFERENCES category (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS favourite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id int NOT NULL,
  tours_id int NOT NULL,
  created_at date DEFAULT current_timestamp(),
  FOREIGN KEY (account_id) REFERENCES account (id),
  FOREIGN KEY (tours_id) REFERENCES tours (id)
) ENGINE = InnoDB;

INSERT INTO `account` (`name`, `email`, `password`, `role`, `creaed_at`, `last_login`) VALUES
('La Ngọc Linh', 'linh123@gmail.com', 'a12345', 'admin', '2021-05-07', '2021-05-07 22:48:35'),
('Phạm Đoàn Hải Yến', 'haiyen123@gmail.com', 'a12345', 'customer', '2021-05-07', '2021-05-07 22:49:48');

INSERT INTO `category`( `name`, `status`) VALUES
('Du Lịch','1'),
('Dã Ngoại','2'),
('Trại Hè','3');

INSERT INTO `tours`(`name`, `price`, `sale_price`, `image`, `category_id`, `status`, `description`) VALUES
('Du lịch Đà Lạt','1200000','0','abc','1','1','abc'),
('Du lịch Hà Nội','2200000','500000','abc','1','2','abc'),
('Du lịch Đà Nẵng','4000000','0','abc','1','1','abc'),
('Du lịch Lào Cai','3000000','300000','abc','1','3','abc');

INSERT INTO `favourite`(`account_id`, `tours_id`) VALUES ('2','1');
