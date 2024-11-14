// src/controllers/v1/JobSimulationController.ts
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
import { JobSimulationService } from '../../services/JobSimulationService';
import {
    JobSimulation,
    CreateJobSimulationInput,
    UpdateJobSimulationInput
} from '../../types/JobSimulationTypes';

@Tags('JobSimulation')
@Route('/api/v1/job/simulation')
@Security('jwt')
export class JobSimulationController {
    /**
     * Get all job simulations
     * @returns A list of all job simulations
     */
    @Get('/')
    async getAllJobSimulations(): Promise<JobSimulation[]> {
        return await JobSimulationService.getAllJobSimulations();
    }

    /**
     * Get a job simulation by ID
     * @param jobSimulationId The ID of the job simulation
     * @returns The job simulation with the specified ID
     */
    @Get('/{jobSimulationId}')
    async getJobSimulationById(
        @Path() jobSimulationId: number
    ): Promise<JobSimulation> {
        const jobSimulation =
            await JobSimulationService.getJobSimulationById(jobSimulationId);
        if (!jobSimulation) throw new Error('JobSimulation not found');
        return jobSimulation;
    }

    /**
     * Create a new job simulation
     * @param data The data for the new job simulation
     * @returns The created job simulation
     */
    @Post('/')
    async createJobSimulation(
        @Body() data: CreateJobSimulationInput
    ): Promise<JobSimulation> {
        return await JobSimulationService.createJobSimulation(data);
    }

    /**
     * Update a job simulation by ID
     * @param jobSimulationId The ID of the job simulation
     * @param data The updated data for the job simulation
     * @returns The updated job simulation
     */
    @Put('/{jobSimulationId}')
    async updateJobSimulation(
        @Path() jobSimulationId: number,
        @Body() data: UpdateJobSimulationInput
    ): Promise<JobSimulation> {
        return await JobSimulationService.updateJobSimulation(
            jobSimulationId,
            data
        );
    }

    /**
     * Delete a job simulation by ID
     * @param jobSimulationId The ID of the job simulation
     */
    @Delete('/{jobSimulationId}')
    async deleteJobSimulation(@Path() jobSimulationId: number): Promise<void> {
        await JobSimulationService.deleteJobSimulation(jobSimulationId);
    }
}
