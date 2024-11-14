/*
  Warnings:

  - A unique constraint covering the columns `[ResetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `ResetPasswordToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_ResetPasswordToken_key` ON `User`(`ResetPasswordToken`);
