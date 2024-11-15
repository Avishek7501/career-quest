// src/services/InterviewAnswerService.ts
import { PrismaClient } from '@prisma/client';
import {
    InterviewAnswer,
    CreateInterviewAnswerInput,
    UpdateInterviewAnswerInput
} from '../types/InterviewAnswerTypes';

const prisma = new PrismaClient();

export class InterviewAnswerService {
    static async getInterviewAnswerById(
        interviewAnswerId: number
    ): Promise<InterviewAnswer | null> {
        return prisma.interviewAnswer.findUnique({
            where: { InterviewAnswerId: interviewAnswerId }
        });
    }

    static async getAllInterviewAnswers(): Promise<InterviewAnswer[]> {
        return prisma.interviewAnswer.findMany();
    }

    static async createInterviewAnswer(
        data: CreateInterviewAnswerInput
    ): Promise<InterviewAnswer> {
        return prisma.interviewAnswer.create({ data });
    }

    static async updateInterviewAnswer(
        interviewAnswerId: number,
        data: UpdateInterviewAnswerInput
    ): Promise<InterviewAnswer> {
        return prisma.interviewAnswer.update({
            where: { InterviewAnswerId: interviewAnswerId },
            data
        });
    }

    static async deleteInterviewAnswer(
        interviewAnswerId: number
    ): Promise<void> {
        await prisma.interviewAnswer.delete({
            where: { InterviewAnswerId: interviewAnswerId }
        });
    }
}
