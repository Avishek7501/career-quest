// src/controllers/v1/JobCategoryController.ts
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
import { JobCategoryService } from '../../services/JobCategoryService';
import {
    JobCategory,
    CreateJobCategoryInput,
    UpdateJobCategoryInput
} from '../../types/JobCategoryTypes';

@Tags('JobCategory')
@Route('/api/v1/job/category')
@Security('jwt')
export class JobCategoryController {
    /**
     * Get all job categories
     * @returns A list of all job categories
     */
    @Get('/')
    async getAllCategories(): Promise<JobCategory[]> {
        return await JobCategoryService.getAllJobCategories();
    }

    /**
     * Get a job category by ID
     * @param categoryId The ID of the category
     * @returns The job category with the specified ID
     */
    @Get('/{categoryId}')
    async getCategoryById(@Path() categoryId: number): Promise<JobCategory> {
        const category =
            await JobCategoryService.getJobCategoryById(categoryId);
        if (!category) throw new Error('JobCategory not found');
        return category;
    }

    /**
     * Create a new job category
     * @param data The data for the new job category
     * @returns The created job category
     */
    @Post('/')
    async createCategory(
        @Body() data: CreateJobCategoryInput
    ): Promise<JobCategory> {
        return await JobCategoryService.createJobCategory(data);
    }

    /**
     * Update a job category by ID
     * @param categoryId The ID of the category
     * @param data The updated data for the category
     * @returns The updated job category
     */
    @Put('/{categoryId}')
    async updateCategory(
        @Path() categoryId: number,
        @Body() data: UpdateJobCategoryInput
    ): Promise<JobCategory> {
        return await JobCategoryService.updateJobCategory(categoryId, data);
    }

    /**
     * Delete a job category by ID
     * @param categoryId The ID of the category
     */
    @Delete('/{categoryId}')
    async deleteCategory(@Path() categoryId: number): Promise<void> {
        await JobCategoryService.deleteJobCategory(categoryId);
    }
}
