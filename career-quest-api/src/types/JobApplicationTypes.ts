// src/types/JobApplicationTypes.ts

export interface JobApplication {
    JobApplicationId: number;
    JobSimulationId: number;
    UserId: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateJobApplicationInput {
    JobSimulationId: number;
    UserId: number;
}

export interface UpdateJobApplicationInput {
    JobSimulationId?: number;
    UserId?: number;
}
