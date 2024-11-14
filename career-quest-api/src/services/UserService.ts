// src/services/UserService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default class UserService {
    static async createUser(username: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: { Username: username, Email: email, Password: hashedPassword }
        });
    }

    static async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { Email: email }
        });
    }

    static async getUserById(userId: number) {
        return prisma.user.findUnique({
            where: { UserId: userId }
        });
    }
}
