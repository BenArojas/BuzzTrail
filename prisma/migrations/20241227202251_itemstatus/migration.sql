/*
  Warnings:

  - Added the required column `importance` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `importance` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'BONUS') NOT NULL,
    ADD COLUMN `status` ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED') NOT NULL;
