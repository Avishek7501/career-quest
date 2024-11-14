// src/types/JobCategoryTypes.ts

export interface JobCategory {
    CategoryId: number;
    CategoryName: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    CreatedBy: number | null;
}

export interface CreateJobCategoryInput {
    CategoryName: string;
    CreatedBy: number | null;
}

export interface UpdateJobCategoryInput {
    CategoryName?: string;
    CreatedBy?: number;
}
