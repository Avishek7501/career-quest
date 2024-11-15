import { Header, Security } from 'tsoa';
import { Route, Tags, Get, Post, Body, Path } from 'tsoa';

import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';

@Tags('Auth')
@Route('/api/v1/auth')
export class AuthController {
    @Post('/register')
    async register(
        @Body()
        {
            username,
            email,
            password
        }: {
            username: string;
            email: string;
            password: string;
        }
    ) {
        const existingUser = await UserService.getUserByEmail(email);
        if (existingUser) throw new Error('User already exists');

        const user = await UserService.createUser(username, email, password);
        return { message: 'User registered successfully', user };
    }

    @Post('/login')
    async login(
        @Body() { email, password }: { email: string; password: string }
    ) {
        return await AuthService.login(email, password);
    }

    @Get('/profile/{userId}')
    @Security('jwt')
    async getProfile(@Path() userId: number) {
        const user = await UserService.getUserById(userId);
        if (!user) throw new Error('User not found');
        return user;
    }

    @Get('/status')
    async checkLoginStatus(@Header('Authorization') authHeader?: string) {
        if (!authHeader) throw new Error('Authorization header is missing');
        const token = authHeader.split(' ')[1];
        const {
            valid,
            token: newToken,
            userId
        } = AuthService.verifyToken(token);
        if (!valid) throw new Error('Invalid or expired token');
        const user = await UserService.getUserById(userId!);
        if (!user) throw new Error('User not found');
        return {
            message: 'User is authenticated',
            token: newToken ?? token,
            user
        };
    }
}
