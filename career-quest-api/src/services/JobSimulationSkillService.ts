// src/services/JobSimulationSkillService.ts
import { PrismaClient } from '@prisma/client';
import {
    JobSimulationSkill,
    CreateJobSimulationSkillInput,
    UpdateJobSimulationSkillInput
} from '../types/JobSimulationSkillTypes';

const prisma = new PrismaClient();

export class JobSimulationSkillService {
    static async getJobSimulationSkillById(
        jobSimulationSkillId: number
    ): Promise<JobSimulationSkill | null> {
        return prisma.jobSimulationSkill.findUnique({
            where: { JobSimulationSkillId: jobSimulationSkillId }
        });
    }

    static async getAllJobSimulationSkills(): Promise<JobSimulationSkill[]> {
        return prisma.jobSimulationSkill.findMany();
    }

    static async createJobSimulationSkill(
        data: CreateJobSimulationSkillInput
    ): Promise<JobSimulationSkill> {
        return prisma.jobSimulationSkill.create({ data });
    }

    static async updateJobSimulationSkill(
        jobSimulationSkillId: number,
        data: UpdateJobSimulationSkillInput
    ): Promise<JobSimulationSkill> {
        return prisma.jobSimulationSkill.update({
            where: { JobSimulationSkillId: jobSimulationSkillId },
            data
        });
    }

    static async deleteJobSimulationSkill(
        jobSimulationSkillId: number
    ): Promise<void> {
        await prisma.jobSimulationSkill.delete({
            where: { JobSimulationSkillId: jobSimulationSkillId }
        });
    }
}
