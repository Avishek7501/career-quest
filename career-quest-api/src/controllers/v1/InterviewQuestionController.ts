// src/controllers/v1/InterviewQuestionController.ts
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
import { InterviewQuestionService } from '../../services/InterviewQuestionService';
import {
    InterviewQuestion,
    CreateInterviewQuestionInput,
    UpdateInterviewQuestionInput
} from '../../types/InterviewQuestionTypes';

@Tags('InterviewQuestion')
@Route('/api/v1/interview/question')
@Security('jwt')
export class InterviewQuestionController {
    /**
     * Get all interview questions
     * @returns A list of all interview questions
     */
    @Get('/')
    async getAllInterviewQuestions(): Promise<InterviewQuestion[]> {
        return await InterviewQuestionService.getAllInterviewQuestions();
    }

    /**
     * Get an interview question by ID
     * @param interviewQuestionId The ID of the interview question
     * @returns The interview question with the specified ID
     */
    @Get('/{interviewQuestionId}')
    async getInterviewQuestionById(
        @Path() interviewQuestionId: number
    ): Promise<InterviewQuestion> {
        const interviewQuestion =
            await InterviewQuestionService.getInterviewQuestionById(
                interviewQuestionId
            );
        if (!interviewQuestion) throw new Error('InterviewQuestion not found');
        return interviewQuestion;
    }

    /**
     * Create a new interview question
     * @param data The data for the new interview question
     * @returns The created interview question
     */
    @Post('/')
    async createInterviewQuestion(
        @Body() data: CreateInterviewQuestionInput
    ): Promise<InterviewQuestion> {
        return await InterviewQuestionService.createInterviewQuestion(data);
    }

    /**
     * Update an interview question by ID
     * @param interviewQuestionId The ID of the interview question
     * @param data The updated data for the interview question
     * @returns The updated interview question
     */
    @Put('/{interviewQuestionId}')
    async updateInterviewQuestion(
        @Path() interviewQuestionId: number,
        @Body() data: UpdateInterviewQuestionInput
    ): Promise<InterviewQuestion> {
        return await InterviewQuestionService.updateInterviewQuestion(
            interviewQuestionId,
            data
        );
    }

    /**
     * Delete an interview question by ID
     * @param interviewQuestionId The ID of the interview question
     */
    @Delete('/{interviewQuestionId}')
    async deleteInterviewQuestion(
        @Path() interviewQuestionId: number
    ): Promise<void> {
        await InterviewQuestionService.deleteInterviewQuestion(
            interviewQuestionId
        );
    }
}
