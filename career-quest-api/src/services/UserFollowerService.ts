// src/services/UserFollowerService.ts
import { PrismaClient } from '@prisma/client';
import {
    UserFollower,
    CreateUserFollowerInput
} from '../types/UserFollowerTypes';

const prisma = new PrismaClient();

export class UserFollowerService {
    static async getUserFollower(
        fromUserId: number,
        toUserId: number
    ): Promise<UserFollower | null> {
        return prisma.userFollower.findUnique({
            where: {
                FromUserId_ToUserId: {
                    FromUserId: fromUserId,
                    ToUserId: toUserId
                }
            }
        });
    }

    static async getFollowersOfUser(toUserId: number): Promise<UserFollower[]> {
        return prisma.userFollower.findMany({ where: { ToUserId: toUserId } });
    }

    static async getFollowingOfUser(
        fromUserId: number
    ): Promise<UserFollower[]> {
        return prisma.userFollower.findMany({
            where: { FromUserId: fromUserId }
        });
    }

    static async createUserFollower(
        data: CreateUserFollowerInput
    ): Promise<UserFollower> {
        return prisma.userFollower.create({ data });
    }

    static async deleteUserFollower(
        fromUserId: number,
        toUserId: number
    ): Promise<void> {
        await prisma.userFollower.delete({
            where: {
                FromUserId_ToUserId: {
                    FromUserId: fromUserId,
                    ToUserId: toUserId
                }
            }
        });
    }
}
