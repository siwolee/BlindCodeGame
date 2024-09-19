CREATE TABLE `user` (
                        `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `intra_id` VARCHAR(1000) NOT NULL,
                        `grade` INT NOT NULL,
                        `is_done` BIT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subject` (
                           `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `name` VARCHAR(1000) NOT NULL,
                           `content` VARCHAR(1000) NOT NULL,
                           `level` INT NOT NULL,
                           `test_case` VARCHAR(1000) NOT NULL,
                           `correct_output` VARCHAR(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_subject` (
                                `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `user_id` BIGINT NOT NULL,
                                `subject_id` BIGINT NOT NULL,
                                `is_solved` BIT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `competition` (
                               `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                               `is_end` BIT(1) NOT NULL,
                               `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
