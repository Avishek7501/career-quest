// src/controllers/v1/JobApplicationController.ts
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
import { JobApplicationService } from '../../services/JobApplicationService';
import {
    JobApplication,
    CreateJobApplicationInput,
    UpdateJobApplicationInput
} from '../../types/JobApplicationTypes';

@Tags('JobApplication')
@Route('/api/v1/job/application')
@Security('jwt')
export class JobApplicationController {
    /**
     * Get all job applications
     * @returns A list of all job applications
     */
    @Get('/')
    async getAllJobApplications(): Promise<JobApplication[]> {
        return await JobApplicationService.getAllJobApplications();
    }

    /**
     * Get a job application by ID
     * @param jobApplicationId The ID of the job application
     * @returns The job application with the specified ID
     */
    @Get('/{jobApplicationId}')
    async getJobApplicationById(
        @Path() jobApplicationId: number
    ): Promise<JobApplication> {
        const jobApplication =
            await JobApplicationService.getJobApplicationById(jobApplicationId);
        if (!jobApplication) throw new Error('JobApplication not found');
        return jobApplication;
    }

    /**
     * Create a new job application
     * @param data The data for the new job application
     * @returns The created job application
     */
    @Post('/')
    async createJobApplication(
        @Body() data: CreateJobApplicationInput
    ): Promise<JobApplication> {
        return await JobApplicationService.createJobApplication(data);
    }

    /**
     * Update a job application by ID
     * @param jobApplicationId The ID of the job application
     * @param data The updated data for the job application
     * @returns The updated job application
     */
    @Put('/{jobApplicationId}')
    async updateJobApplication(
        @Path() jobApplicationId: number,
        @Body() data: UpdateJobApplicationInput
    ): Promise<JobApplication> {
        return await JobApplicationService.updateJobApplication(
            jobApplicationId,
            data
        );
    }

    /**
     * Delete a job application by ID
     * @param jobApplicationId The ID of the job application
     */
    @Delete('/{jobApplicationId}')
    async deleteJobApplication(
        @Path() jobApplicationId: number
    ): Promise<void> {
        await JobApplicationService.deleteJobApplication(jobApplicationId);
    }
}
