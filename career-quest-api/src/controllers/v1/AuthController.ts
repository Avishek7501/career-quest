import { Security } from 'tsoa';
import { Route, Tags, Get, Post, Body, Path } from 'tsoa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserService from '../../services/UserService';
import environments from '../../config/environments';

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
        const user = await UserService.getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.Password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user.UserId },
            environments.JWT_SECRET ?? '',
            {
                expiresIn: '30d'
            }
        );
        return { message: 'Logged in successfully', token };
    }

    @Get('/profile/{userId}')
    @Security('jwt')
    async getProfile(@Path() userId: number) {
        const user = await UserService.getUserById(userId);
        if (!user) throw new Error('User not found');
        return user;
    }
}
