-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_adventureId_fkey`;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_adventureId_fkey` FOREIGN KEY (`adventureId`) REFERENCES `Adventure`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
