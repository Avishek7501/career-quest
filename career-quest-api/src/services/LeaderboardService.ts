// src/services/LeaderboardService.ts
import { PrismaClient } from '@prisma/client';
import {
    Leaderboard,
    CreateLeaderboardInput,
    UpdateLeaderboardInput
} from '../types/LeaderboardTypes';

const prisma = new PrismaClient();

export class LeaderboardService {
    static async getLeaderboardById(
        leaderboardId: number
    ): Promise<Leaderboard | null> {
        return prisma.leaderboard.findUnique({
            where: { LeaderboardId: leaderboardId }
        });
    }

    static async getAllLeaderboards(): Promise<Leaderboard[]> {
        return prisma.leaderboard.findMany();
    }

    static async createLeaderboard(
        data: CreateLeaderboardInput
    ): Promise<Leaderboard> {
        return prisma.leaderboard.create({ data });
    }

    static async updateLeaderboard(
        leaderboardId: number,
        data: UpdateLeaderboardInput
    ): Promise<Leaderboard> {
        return prisma.leaderboard.update({
            where: { LeaderboardId: leaderboardId },
            data
        });
    }

    static async deleteLeaderboard(leaderboardId: number): Promise<void> {
        await prisma.leaderboard.delete({
            where: { LeaderboardId: leaderboardId }
        });
    }
}
