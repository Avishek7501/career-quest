// src/services/JobSimulationService.ts
import { PrismaClient } from '@prisma/client';
import {
    JobSimulation,
    CreateJobSimulationInput,
    UpdateJobSimulationInput
} from '../types/JobSimulationTypes';

const prisma = new PrismaClient();

export class JobSimulationService {
    static async getJobSimulationById(
        jobSimulationId: number
    ): Promise<JobSimulation | null> {
        return prisma.jobSimulation.findUnique({
            where: { JobSimulationId: jobSimulationId }
        });
    }

    static async getAllJobSimulations(): Promise<JobSimulation[]> {
        return prisma.jobSimulation.findMany();
    }

    static async createJobSimulation(
        data: CreateJobSimulationInput
    ): Promise<JobSimulation> {
        return prisma.jobSimulation.create({ data });
    }

    static async updateJobSimulation(
        jobSimulationId: number,
        data: UpdateJobSimulationInput
    ): Promise<JobSimulation> {
        return prisma.jobSimulation.update({
            where: { JobSimulationId: jobSimulationId },
            data
        });
    }

    static async deleteJobSimulation(jobSimulationId: number): Promise<void> {
        await prisma.jobSimulation.delete({
            where: { JobSimulationId: jobSimulationId }
        });
    }
}
