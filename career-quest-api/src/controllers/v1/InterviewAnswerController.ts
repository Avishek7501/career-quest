// src/controllers/v1/InterviewAnswerController.ts
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
import { InterviewAnswerService } from '../../services/InterviewAnswerService';
import {
    InterviewAnswer,
    CreateInterviewAnswerInput,
    UpdateInterviewAnswerInput
} from '../../types/InterviewAnswerTypes';

@Tags('InterviewAnswer')
@Route('/api/v1/interview/answer')
@Security('jwt')
export class InterviewAnswerController {
    /**
     * Get all interview answers
     * @returns A list of all interview answers
     */
    @Get('/')
    async getAllInterviewAnswers(): Promise<InterviewAnswer[]> {
        return await InterviewAnswerService.getAllInterviewAnswers();
    }

    /**
     * Get an interview answer by ID
     * @param interviewAnswerId The ID of the interview answer
     * @returns The interview answer with the specified ID
     */
    @Get('/{interviewAnswerId}')
    async getInterviewAnswerById(
        @Path() interviewAnswerId: number
    ): Promise<InterviewAnswer> {
        const interviewAnswer =
            await InterviewAnswerService.getInterviewAnswerById(
                interviewAnswerId
            );
        if (!interviewAnswer) throw new Error('InterviewAnswer not found');
        return interviewAnswer;
    }

    /**
     * Create a new interview answer
     * @param data The data for the new interview answer
     * @returns The created interview answer
     */
    @Post('/')
    async createInterviewAnswer(
        @Body() data: CreateInterviewAnswerInput
    ): Promise<InterviewAnswer> {
        return await InterviewAnswerService.createInterviewAnswer(data);
    }

    /**
     * Update an interview answer by ID
     * @param interviewAnswerId The ID of the interview answer
     * @param data The updated data for the interview answer
     * @returns The updated interview answer
     */
    @Put('/{interviewAnswerId}')
    async updateInterviewAnswer(
        @Path() interviewAnswerId: number,
        @Body() data: UpdateInterviewAnswerInput
    ): Promise<InterviewAnswer> {
        return await InterviewAnswerService.updateInterviewAnswer(
            interviewAnswerId,
            data
        );
    }

    /**
     * Delete an interview answer by ID
     * @param interviewAnswerId The ID of the interview answer
     */
    @Delete('/{interviewAnswerId}')
    async deleteInterviewAnswer(
        @Path() interviewAnswerId: number
    ): Promise<void> {
        await InterviewAnswerService.deleteInterviewAnswer(interviewAnswerId);
    }
}
