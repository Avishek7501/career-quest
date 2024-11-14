// src/controllers/v1/JobSimulationSkillController.ts
import {
    Route,
    Tags,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Path,
    Security
} from 'tsoa';
import { JobSimulationSkillService } from '../../services/JobSimulationSkillService';
import {
    JobSimulationSkill,
    CreateJobSimulationSkillInput,
    UpdateJobSimulationSkillInput
} from '../../types/JobSimulationSkillTypes';

@Tags('JobSimulationSkill')
@Route('/api/v1/simulation/skill')
@Security('jwt')
export class JobSimulationSkillController {
    /**
     * Get all job simulation skills
     * @returns A list of all job simulation skills
     */
    @Get('/')
    async getAllJobSimulationSkills(): Promise<JobSimulationSkill[]> {
        return await JobSimulationSkillService.getAllJobSimulationSkills();
    }

    /**
     * Get a job simulation skill by ID
     * @param jobSimulationSkillId The ID of the job simulation skill
     * @returns The job simulation skill with the specified ID
     */
    @Get('/{jobSimulationSkillId}')
    async getJobSimulationSkillById(
        @Path() jobSimulationSkillId: number
    ): Promise<JobSimulationSkill> {
        const jobSimulationSkill =
            await JobSimulationSkillService.getJobSimulationSkillById(
                jobSimulationSkillId
            );
        if (!jobSimulationSkill)
            throw new Error('JobSimulationSkill not found');
        return jobSimulationSkill;
    }

    /**
     * Create a new job simulation skill
     * @param data The data for the new job simulation skill
     * @returns The created job simulation skill
     */
    @Post('/')
    async createJobSimulationSkill(
        @Body() data: CreateJobSimulationSkillInput
    ): Promise<JobSimulationSkill> {
        return await JobSimulationSkillService.createJobSimulationSkill(data);
    }

    /**
     * Update a job simulation skill by ID
     * @param jobSimulationSkillId The ID of the job simulation skill
     * @param data The updated data for the job simulation skill
     * @returns The updated job simulation skill
     */
    @Put('/{jobSimulationSkillId}')
    async updateJobSimulationSkill(
        @Path() jobSimulationSkillId: number,
        @Body() data: UpdateJobSimulationSkillInput
    ): Promise<JobSimulationSkill> {
        return await JobSimulationSkillService.updateJobSimulationSkill(
            jobSimulationSkillId,
            data
        );
    }

    /**
     * Delete a job simulation skill by ID
     * @param jobSimulationSkillId The ID of the job simulation skill
     */
    @Delete('/{jobSimulationSkillId}')
    async deleteJobSimulationSkill(
        @Path() jobSimulationSkillId: number
    ): Promise<void> {
        await JobSimulationSkillService.deleteJobSimulationSkill(
            jobSimulationSkillId
        );
    }
}
