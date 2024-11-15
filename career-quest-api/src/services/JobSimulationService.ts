// src/services/JobSimulationService.ts
import { PrismaClient } from '@prisma/client';
import {
    JobSimulation,
    CreateJobSimulationInput,
    UpdateJobSimulationInput,
    SimulationStartData
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

    static async startSimulation(
        simulationId: number
    ): Promise<SimulationStartData | null> {
        const simulation = await prisma.jobSimulation.findUnique({
            where: { JobSimulationId: simulationId },
            include: {
                InterviewQuestions: {
                    include: {
                        InterviewAnswers: true
                    }
                },
                JobCategory: true,
                JobSimulationSkills: {
                    include: {
                        JobSkill: true
                    }
                }
            }
        });

        if (!simulation) {
            return null;
        }

        // Return structured data for simulation start
        return {
            simulation: {
                id: simulation.JobSimulationId,
                title: simulation.JobTitle,
                description: simulation.JobDescription,
                category: simulation.JobCategory.CategoryName,
                skills: simulation.JobSimulationSkills.map(
                    (skill) => skill.JobSkill.SkillName
                )
            },
            questions: simulation.InterviewQuestions.map((question) => ({
                questionId: question.InterviewQuestionId,
                questionText: question.QuestionText,
                questionType: question.QuestionType,
                answers: question.InterviewAnswers.map((answer) => ({
                    answerId: answer.InterviewAnswerId,
                    answerText: answer.Answer,
                    isCorrect: answer.IsCorrect
                }))
            }))
        };
    }
}
