// src/controllers/v1/JobSkillController.ts
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
import { JobSkillService } from '../../services/JobSkillService';
import {
    JobSkill,
    CreateJobSkillInput,
    UpdateJobSkillInput
} from '../../types/JobSkillTypes';

@Tags('JobSkill')
@Route('/api/v1/job/skill')
@Security('jwt')
export class JobSkillController {
    /**
     * Get all job skills
     * @returns A list of all job skills
     */
    @Get('/')
    async getAllJobSkills(): Promise<JobSkill[]> {
        return await JobSkillService.getAllJobSkills();
    }

    /**
     * Get a job skill by ID
     * @param jobSkillId The ID of the job skill
     * @returns The job skill with the specified ID
     */
    @Get('/{jobSkillId}')
    async getJobSkillById(@Path() jobSkillId: number): Promise<JobSkill> {
        const jobSkill = await JobSkillService.getJobSkillById(jobSkillId);
        if (!jobSkill) throw new Error('JobSkill not found');
        return jobSkill;
    }

    /**
     * Create a new job skill
     * @param data The data for the new job skill
     * @returns The created job skill
     */
    @Post('/')
    async createJobSkill(@Body() data: CreateJobSkillInput): Promise<JobSkill> {
        return await JobSkillService.createJobSkill(data);
    }

    /**
     * Update a job skill by ID
     * @param jobSkillId The ID of the job skill
     * @param data The updated data for the job skill
     * @returns The updated job skill
     */
    @Put('/{jobSkillId}')
    async updateJobSkill(
        @Path() jobSkillId: number,
        @Body() data: UpdateJobSkillInput
    ): Promise<JobSkill> {
        return await JobSkillService.updateJobSkill(jobSkillId, data);
    }

    /**
     * Delete a job skill by ID
     * @param jobSkillId The ID of the job skill
     */
    @Delete('/{jobSkillId}')
    async deleteJobSkill(@Path() jobSkillId: number): Promise<void> {
        await JobSkillService.deleteJobSkill(jobSkillId);
    }
}
