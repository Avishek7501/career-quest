// src/types/JobSimulationTypes.ts

export interface JobSimulation {
    JobSimulationId: number;
    JobCategoryId: number;
    JobTitle: string;
    JobDescription: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateJobSimulationInput {
    JobCategoryId: number;
    JobTitle: string;
    JobDescription: string;
}

export interface UpdateJobSimulationInput {
    JobCategoryId?: number;
    JobTitle?: string;
    JobDescription?: string;
}
