// src/services/AuthService.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import environments from '../config/environments';
import UserService from './UserService';

// Temporary in-memory token blacklist (consider using Redis or a DB for production)
const tokenBlacklist = new Set<string>();

class AuthService {
    // Generate JWT token
    static generateToken(userId: number): string {
        return jwt.sign({ userId }, environments.JWT_SECRET ?? '', {
            expiresIn: '30d'
        });
    }

    // Verify token and reissue if expired
    static verifyToken(token: string): {
        valid: boolean;
        token?: string;
        userId?: number;
    } {
        if (tokenBlacklist.has(token)) {
            return { valid: false };
        }

        try {
            const decoded = jwt.verify(
                token,
                environments.JWT_SECRET ?? ''
            ) as JwtPayload;
            return { valid: true, userId: decoded.userId, token };
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                const decoded = jwt.decode(token) as JwtPayload;
                if (decoded && decoded.userId) {
                    const newToken = this.generateToken(decoded.userId);
                    return {
                        valid: true,
                        userId: decoded.userId,
                        token: newToken
                    };
                }
            }
            return { valid: false };
        }
    }

    // Login function with token generation
    static async login(
        email: string,
        password: string
    ): Promise<{ message: string; token?: string }> {
        const user = await UserService.getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.Password))) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user.UserId);
        return { message: 'Logged in successfully', token };
    }

    // Logout function by adding token to the blacklist
    static logout(token: string): { message: string } {
        tokenBlacklist.add(token);
        return { message: 'Logged out successfully' };
    }
}

export default AuthService;
