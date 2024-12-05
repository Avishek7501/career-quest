-- AlterTable
ALTER TABLE `User` ADD COLUMN `ReferredById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ReferredById_fkey` FOREIGN KEY (`ReferredById`) REFERENCES `User`(`UserId`) ON DELETE SET NULL ON UPDATE CASCADE;