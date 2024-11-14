// src/types/JobSimulationSkillTypes.ts

export interface JobSimulationSkill {
    JobSimulationSkillId: number;
    JobSimulationId: number;
    JobSkillId: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateJobSimulationSkillInput {
    JobSimulationId: number;
    JobSkillId: number;
}

export interface UpdateJobSimulationSkillInput {
    JobSimulationId?: number;
    JobSkillId?: number;
}
