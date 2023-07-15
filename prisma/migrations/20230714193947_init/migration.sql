-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_otp` (
    `otp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp_hashed` VARCHAR(191) NOT NULL,
    `otp_email` VARCHAR(191) NOT NULL,
    `otp_tried` INTEGER NULL DEFAULT 0,
    `otp_matched` INTEGER NULL DEFAULT 0,
    `otp_type` VARCHAR(191) NOT NULL,
    `otp_create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`otp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
