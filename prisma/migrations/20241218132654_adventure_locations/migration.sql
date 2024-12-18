/*
  Warnings:

  - Added the required column `budget` to the `Adventure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Adventure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Adventure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Adventure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Adventure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Adventure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adventure` ADD COLUMN `budget` INTEGER NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `difficulty` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
