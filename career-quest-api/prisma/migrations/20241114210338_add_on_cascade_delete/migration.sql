-- DropForeignKey
ALTER TABLE `InterviewAnswer` DROP FOREIGN KEY `InterviewAnswer_InterviewQuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `InterviewQuestion` DROP FOREIGN KEY `InterviewQuestion_JobSimulationId_fkey`;

-- DropForeignKey
ALTER TABLE `JobApplication` DROP FOREIGN KEY `JobApplication_JobSimulationId_fkey`;

-- DropForeignKey
ALTER TABLE `JobApplication` DROP FOREIGN KEY `JobApplication_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `JobSimulation` DROP FOREIGN KEY `JobSimulation_JobCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `JobSimulationSkill` DROP FOREIGN KEY `JobSimulationSkill_JobSimulationId_fkey`;

-- DropForeignKey
ALTER TABLE `JobSimulationSkill` DROP FOREIGN KEY `JobSimulationSkill_JobSkillId_fkey`;

-- DropForeignKey
ALTER TABLE `JobSkill` DROP FOREIGN KEY `JobSkill_JobCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Leaderboard` DROP FOREIGN KEY `Leaderboard_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `UserFollower` DROP FOREIGN KEY `UserFollower_FromUserId_fkey`;

-- DropForeignKey
ALTER TABLE `UserFollower` DROP FOREIGN KEY `UserFollower_ToUserId_fkey`;

-- AddForeignKey
ALTER TABLE `UserFollower` ADD CONSTRAINT `UserFollower_FromUserId_fkey` FOREIGN KEY (`FromUserId`) REFERENCES `User`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFollower` ADD CONSTRAINT `UserFollower_ToUserId_fkey` FOREIGN KEY (`ToUserId`) REFERENCES `User`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leaderboard` ADD CONSTRAINT `Leaderboard_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_JobSimulationId_fkey` FOREIGN KEY (`JobSimulationId`) REFERENCES `JobSimulation`(`JobSimulationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSimulation` ADD CONSTRAINT `JobSimulation_JobCategoryId_fkey` FOREIGN KEY (`JobCategoryId`) REFERENCES `JobCategory`(`CategoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSimulationSkill` ADD CONSTRAINT `JobSimulationSkill_JobSimulationId_fkey` FOREIGN KEY (`JobSimulationId`) REFERENCES `JobSimulation`(`JobSimulationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSimulationSkill` ADD CONSTRAINT `JobSimulationSkill_JobSkillId_fkey` FOREIGN KEY (`JobSkillId`) REFERENCES `JobSkill`(`JobSkillId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSkill` ADD CONSTRAINT `JobSkill_JobCategoryId_fkey` FOREIGN KEY (`JobCategoryId`) REFERENCES `JobCategory`(`CategoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewQuestion` ADD CONSTRAINT `InterviewQuestion_JobSimulationId_fkey` FOREIGN KEY (`JobSimulationId`) REFERENCES `JobSimulation`(`JobSimulationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewAnswer` ADD CONSTRAINT `InterviewAnswer_InterviewQuestionId_fkey` FOREIGN KEY (`InterviewQuestionId`) REFERENCES `InterviewQuestion`(`InterviewQuestionId`) ON DELETE CASCADE ON UPDATE CASCADE;
