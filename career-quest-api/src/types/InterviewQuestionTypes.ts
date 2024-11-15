// src/types/InterviewQuestionTypes.ts

export interface InterviewQuestion {
    InterviewQuestionId: number;
    JobSimulationId: number;
    QuestionText: string;
    QuestionType: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateInterviewQuestionInput {
    JobSimulationId: number;
    QuestionText: string;
    QuestionType: string;
}

export interface UpdateInterviewQuestionInput {
    JobSimulationId?: number;
    QuestionText?: string;
    QuestionType?: string;
}
