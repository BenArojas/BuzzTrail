/*
  Warnings:

  - You are about to alter the column `status` on the `adventure` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `adventure` MODIFY `status` ENUM('NOT_STARTED', 'ACTIVE', 'COMPLETED') NOT NULL DEFAULT 'NOT_STARTED',
    MODIFY `budget` INTEGER NULL,
    MODIFY `notes` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL;
