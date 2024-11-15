// src/types/LeaderboardTypes.ts

export interface Leaderboard {
    LeaderboardId: number;
    UserId: number;
    CurrentScore: number;
    TotalScore: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateLeaderboardInput {
    UserId: number;
    CurrentScore: number;
    TotalScore: number;
}

export interface UpdateLeaderboardInput {
    CurrentScore?: number;
    TotalScore?: number;
}
