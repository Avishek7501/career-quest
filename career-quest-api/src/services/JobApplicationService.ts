// src/services/JobApplicationService.ts
import { PrismaClient } from '@prisma/client';
import {
    JobApplication,
    CreateJobApplicationInput,
    UpdateJobApplicationInput
} from '../types/JobApplicationTypes';

const prisma = new PrismaClient();

export class JobApplicationService {
    static async getJobApplicationById(
        jobApplicationId: number
    ): Promise<JobApplication | null> {
        return prisma.jobApplication.findUnique({
            where: { JobApplicationId: jobApplicationId }
        });
    }

    static async getAllJobApplications(): Promise<JobApplication[]> {
        return prisma.jobApplication.findMany();
    }

    static async createJobApplication(
        data: CreateJobApplicationInput
    ): Promise<JobApplication> {
        return prisma.jobApplication.create({ data });
    }

    static async updateJobApplication(
        jobApplicationId: number,
        data: UpdateJobApplicationInput
    ): Promise<JobApplication> {
        return prisma.jobApplication.update({
            where: { JobApplicationId: jobApplicationId },
            data
        });
    }

    static async deleteJobApplication(jobApplicationId: number): Promise<void> {
        await prisma.jobApplication.delete({
            where: { JobApplicationId: jobApplicationId }
        });
    }
}
