// src/services/JobCategoryService.ts
import { PrismaClient } from '@prisma/client';
import {
    JobCategory,
    CreateJobCategoryInput,
    UpdateJobCategoryInput
} from '../types/JobCategoryTypes';

const prisma = new PrismaClient();

export class JobCategoryService {
    static async getJobCategoryById(
        categoryId: number
    ): Promise<JobCategory | null> {
        return prisma.jobCategory.findUnique({
            where: { CategoryId: categoryId }
        });
    }

    static async getAllJobCategories(): Promise<JobCategory[]> {
        return prisma.jobCategory.findMany();
    }

    static async createJobCategory(
        data: CreateJobCategoryInput
    ): Promise<JobCategory> {
        return prisma.jobCategory.create({ data });
    }

    static async updateJobCategory(
        categoryId: number,
        data: UpdateJobCategoryInput
    ): Promise<JobCategory> {
        return prisma.jobCategory.update({
            where: { CategoryId: categoryId },
            data
        });
    }

    static async deleteJobCategory(categoryId: number): Promise<void> {
        await prisma.jobCategory.delete({ where: { CategoryId: categoryId } });
    }
}
