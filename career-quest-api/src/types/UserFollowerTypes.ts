// src/types/UserFollowerTypes.ts

export interface UserFollower {
    FromUserId: number;
    ToUserId: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateUserFollowerInput {
    FromUserId: number;
    ToUserId: number;
}
