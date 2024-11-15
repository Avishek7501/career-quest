// src/controllers/v1/UserFollowerController.ts
import { Route, Tags, Get, Post, Delete, Body, Path, Security } from 'tsoa';
import { UserFollowerService } from '../../services/UserFollowerService';
import {
    UserFollower,
    CreateUserFollowerInput
} from '../../types/UserFollowerTypes';

@Tags('UserFollower')
@Route('/api/v1/user/follower')
@Security('jwt')
export class UserFollowerController {
    /**
     * Get a follower relationship between two users
     * @param fromUserId The ID of the user who is following
     * @param toUserId The ID of the user being followed
     * @returns The follower relationship between the two users, if it exists
     */
    @Get('/{fromUserId}/{toUserId}')
    async getUserFollower(
        @Path() fromUserId: number,
        @Path() toUserId: number
    ): Promise<UserFollower> {
        const userFollower = await UserFollowerService.getUserFollower(
            fromUserId,
            toUserId
        );
        if (!userFollower)
            throw new Error('UserFollower relationship not found');
        return userFollower;
    }

    /**
     * Get all followers of a user
     * @param toUserId The ID of the user being followed
     * @returns A list of followers of the specified user
     */
    @Get('/followers/{toUserId}')
    async getFollowersOfUser(
        @Path() toUserId: number
    ): Promise<UserFollower[]> {
        return await UserFollowerService.getFollowersOfUser(toUserId);
    }

    /**
     * Get all users followed by a user
     * @param fromUserId The ID of the user who is following
     * @returns A list of users that the specified user is following
     */
    @Get('/following/{fromUserId}')
    async getFollowingOfUser(
        @Path() fromUserId: number
    ): Promise<UserFollower[]> {
        return await UserFollowerService.getFollowingOfUser(fromUserId);
    }

    /**
     * Create a follower relationship between two users
     * @param data The data for the new follower relationship
     * @returns The created follower relationship
     */
    @Post('/')
    async createUserFollower(
        @Body() data: CreateUserFollowerInput
    ): Promise<UserFollower> {
        return await UserFollowerService.createUserFollower(data);
    }

    /**
     * Delete a follower relationship between two users
     * @param fromUserId The ID of the user who is following
     * @param toUserId The ID of the user being followed
     */
    @Delete('/{fromUserId}/{toUserId}')
    async deleteUserFollower(
        @Path() fromUserId: number,
        @Path() toUserId: number
    ): Promise<void> {
        await UserFollowerService.deleteUserFollower(fromUserId, toUserId);
    }
}
