// src/controllers/v1/LeaderboardController.ts
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
import { LeaderboardService } from '../../services/LeaderboardService';
import {
    Leaderboard,
    CreateLeaderboardInput,
    UpdateLeaderboardInput
} from '../../types/LeaderboardTypes';

@Tags('Leaderboard')
@Route('/api/v1/leaderboard')
@Security('jwt')
export class LeaderboardController {
    /**
     * Get all leaderboards
     * @returns A list of all leaderboards
     */
    @Get('/')
    async getAllLeaderboards(): Promise<Leaderboard[]> {
        return await LeaderboardService.getAllLeaderboards();
    }

    /**
     * Get a leaderboard by ID
     * @param leaderboardId The ID of the leaderboard
     * @returns The leaderboard with the specified ID
     */
    @Get('/{leaderboardId}')
    async getLeaderboardById(
        @Path() leaderboardId: number
    ): Promise<Leaderboard> {
        const leaderboard =
            await LeaderboardService.getLeaderboardById(leaderboardId);
        if (!leaderboard) throw new Error('Leaderboard not found');
        return leaderboard;
    }

    /**
     * Create a new leaderboard entry
     * @param data The data for the new leaderboard entry
     * @returns The created leaderboard entry
     */
    @Post('/')
    async createLeaderboard(
        @Body() data: CreateLeaderboardInput
    ): Promise<Leaderboard> {
        return await LeaderboardService.createLeaderboard(data);
    }

    /**
     * Update a leaderboard entry by ID
     * @param leaderboardId The ID of the leaderboard entry
     * @param data The updated data for the leaderboard entry
     * @returns The updated leaderboard entry
     */
    @Put('/{leaderboardId}')
    async updateLeaderboard(
        @Path() leaderboardId: number,
        @Body() data: UpdateLeaderboardInput
    ): Promise<Leaderboard> {
        return await LeaderboardService.updateLeaderboard(leaderboardId, data);
    }

    /**
     * Delete a leaderboard entry by ID
     * @param leaderboardId The ID of the leaderboard entry
     */
    @Delete('/{leaderboardId}')
    async deleteLeaderboard(@Path() leaderboardId: number): Promise<void> {
        await LeaderboardService.deleteLeaderboard(leaderboardId);
    }
}
