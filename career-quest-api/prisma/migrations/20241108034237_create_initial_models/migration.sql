-- CreateTable
CREATE TABLE `User` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NULL,
    `Phone` VARCHAR(191) NULL,
    `Gender` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_Username_key`(`Username`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFollower` (
    `FromUserId` INTEGER NOT NULL,
    `ToUserId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`FromUserId`, `ToUserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leaderboard` (
    `LeaderboardId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `CurrentScore` INTEGER NOT NULL,
    `TotalScore` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Leaderboard_UserId_key`(`UserId`),
    PRIMARY KEY (`LeaderboardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobApplication` (
    `JobApplicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `JobSimulationId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`JobApplicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobSimulation` (
    `JobSimulationId` INTEGER NOT NULL AUTO_INCREMENT,
    `JobCategoryId` INTEGER NOT NULL,
    `JobTitle` VARCHAR(191) NOT NULL,
    `JobDescription` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`JobSimulationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobCategory` (
    `CategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `CategoryName` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `CreatedBy` INTEGER NOT NULL,

    PRIMARY KEY (`CategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobSimulationSkill` (
    `JobSimulationSkillId` INTEGER NOT NULL AUTO_INCREMENT,
    `JobSimulationId` INTEGER NOT NULL,
    `JobSkillId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`JobSimulationSkillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobSkill` (
    `JobSkillId` INTEGER NOT NULL AUTO_INCREMENT,
    `JobCategoryId` INTEGER NOT NULL,
    `SkillName` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`JobSkillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterviewQuestion` (
    `InterviewQuestionId` INTEGER NOT NULL AUTO_INCREMENT,
    `JobSimulationId` INTEGER NOT NULL,
    `QuestionText` VARCHAR(191) NOT NULL,
    `QuestionType` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`InterviewQuestionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterviewAnswer` (
    `InterviewAnswerId` INTEGER NOT NULL AUTO_INCREMENT,
    `InterviewQuestionId` INTEGER NOT NULL,
    `Answer` VARCHAR(191) NOT NULL,
    `IsCorrect` BOOLEAN NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`InterviewAnswerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserFollower` ADD CONSTRAINT `UserFollower_FromUserId_fkey` FOREIGN KEY (`FromUserId`) REFERENCES `User`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFollower` ADD CONSTRAINT `UserFollower_ToUserId_fkey` FOREIGN KEY (`ToUserId`) REFERENCES `User`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leaderboard` ADD CONSTRAINT `Leaderboard_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_JobSimulationId_fkey` FOREIGN KEY (`JobSimulationId`) REFERENCES `JobSimulation`(`JobSimulationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSimulation` ADD CONSTRAINT `JobSimulation_JobCategoryId_fkey` FOREIGN KEY (`JobCategoryId`) REFERENCES `JobCategory`(`CategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSimulationSkill` ADD CONSTRAINT `JobSimulationSkill_JobSimulationId_fkey` FOREIGN KEY (`JobSimulationId`) REFERENCES `JobSimulation`(`JobSimulationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSimulationSkill` ADD CONSTRAINT `JobSimulationSkill_JobSkillId_fkey` FOREIGN KEY (`JobSkillId`) REFERENCES `JobSkill`(`JobSkillId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSkill` ADD CONSTRAINT `JobSkill_JobCategoryId_fkey` FOREIGN KEY (`JobCategoryId`) REFERENCES `JobCategory`(`CategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewQuestion` ADD CONSTRAINT `InterviewQuestion_JobSimulationId_fkey` FOREIGN KEY (`JobSimulationId`) REFERENCES `JobSimulation`(`JobSimulationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewAnswer` ADD CONSTRAINT `InterviewAnswer_InterviewQuestionId_fkey` FOREIGN KEY (`InterviewQuestionId`) REFERENCES `InterviewQuestion`(`InterviewQuestionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
