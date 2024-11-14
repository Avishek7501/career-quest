// src/types/JobSkillTypes.ts

export interface JobSkill {
    JobSkillId: number;
    JobCategoryId: number;
    SkillName: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateJobSkillInput {
    JobCategoryId: number;
    SkillName: string;
}

export interface UpdateJobSkillInput {
    JobCategoryId?: number;
    SkillName?: string;
}
