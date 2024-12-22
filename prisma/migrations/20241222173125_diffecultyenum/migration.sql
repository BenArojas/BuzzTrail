/*
  Warnings:

  - You are about to alter the column `difficulty` on the `adventure` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `adventure` MODIFY `difficulty` ENUM('easy', 'medium', 'hard') NOT NULL;
