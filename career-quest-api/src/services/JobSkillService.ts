// src/services/JobSkillService.ts
import { PrismaClient } from '@prisma/client';
import {
    CreateJobSkillInput,
    UpdateJobSkillInput,
    JobSkill
} from '../types/JobSkillTypes';

const prisma = new PrismaClient();

export class JobSkillService {
    static async getJobSkillById(jobSkillId: number): Promise<JobSkill | null> {
        return prisma.jobSkill.findUnique({
            where: { JobSkillId: jobSkillId }
        });
    }

    static async getAllJobSkills(): Promise<JobSkill[]> {
        return prisma.jobSkill.findMany();
    }

    static async createJobSkill(data: CreateJobSkillInput): Promise<JobSkill> {
        return prisma.jobSkill.create({ data });
    }

    static async updateJobSkill(
        jobSkillId: number,
        data: UpdateJobSkillInput
    ): Promise<JobSkill> {
        return prisma.jobSkill.update({
            where: { JobSkillId: jobSkillId },
            data
        });
    }

    static async deleteJobSkill(jobSkillId: number): Promise<void> {
        await prisma.jobSkill.delete({ where: { JobSkillId: jobSkillId } });
    }
}
