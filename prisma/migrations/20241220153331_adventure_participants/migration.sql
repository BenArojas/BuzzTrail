/*
  Warnings:

  - Added the required column `participants` to the `Adventure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adventure` ADD COLUMN `participants` INTEGER NOT NULL;
