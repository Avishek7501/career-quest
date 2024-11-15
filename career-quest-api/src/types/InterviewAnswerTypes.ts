// src/types/InterviewAnswerTypes.ts

export interface InterviewAnswer {
    InterviewAnswerId: number;
    InterviewQuestionId: number;
    Answer: string;
    IsCorrect: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateInterviewAnswerInput {
    InterviewQuestionId: number;
    Answer: string;
    IsCorrect: boolean;
}

export interface UpdateInterviewAnswerInput {
    InterviewQuestionId?: number;
    Answer?: string;
    IsCorrect?: boolean;
}
