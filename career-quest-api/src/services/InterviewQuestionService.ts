// src/services/InterviewQuestionService.ts
import { PrismaClient } from '@prisma/client';
import {
    InterviewQuestion,
    CreateInterviewQuestionInput,
    UpdateInterviewQuestionInput
} from '../types/InterviewQuestionTypes';

const prisma = new PrismaClient();

export class InterviewQuestionService {
    static async getInterviewQuestionById(
        interviewQuestionId: number
    ): Promise<InterviewQuestion | null> {
        return prisma.interviewQuestion.findUnique({
            where: { InterviewQuestionId: interviewQuestionId }
        });
    }

    static async getAllInterviewQuestions(): Promise<InterviewQuestion[]> {
        return prisma.interviewQuestion.findMany();
    }

    static async createInterviewQuestion(
        data: CreateInterviewQuestionInput
    ): Promise<InterviewQuestion> {
        return prisma.interviewQuestion.create({ data });
    }

    static async updateInterviewQuestion(
        interviewQuestionId: number,
        data: UpdateInterviewQuestionInput
    ): Promise<InterviewQuestion> {
        return prisma.interviewQuestion.update({
            where: { InterviewQuestionId: interviewQuestionId },
            data
        });
    }

    static async deleteInterviewQuestion(
        interviewQuestionId: number
    ): Promise<void> {
        await prisma.interviewQuestion.delete({
            where: { InterviewQuestionId: interviewQuestionId }
        });
    }
}
