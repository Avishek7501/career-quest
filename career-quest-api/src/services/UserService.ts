// src/services/UserService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();

export default class UserService {
    static async generateUniqueReferralCode(): Promise<string> {
        let code: string;
        let exists: boolean;

        do {
            code = crypto.randomBytes(5).toString('hex'); // Generate a 10-character random code
            const user = await prisma.user.findUnique({
                where: { ReferralCode: code }
            });
            exists = !!user; // Check if the code already exists
        } while (exists);

        return code;
    }

    static async createUser(
        username: string,
        email: string,
        password: string,
        referralCode?: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Initialize ReferredById as null
        let referredById: number | null = null;

        // If a referral code is provided, find the user who owns the code
        if (referralCode) {
            const referredByUser = await prisma.user.findUnique({
                where: { ReferralCode: referralCode }
            });
            if (!referredByUser) {
                throw new Error('Invalid referral code.');
            }
            referredById = referredByUser.UserId;
        }

        // Generate a unique referral code for the new user
        const uniqueReferralCode = await this.generateUniqueReferralCode();

        // Create the new user with a referral relationship
        return prisma.user.create({
            data: {
                Username: username,
                Email: email,
                Password: hashedPassword,
                ReferralCode: uniqueReferralCode,
                ReferredById: referredById // Set the referring user if provided
            }
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

    static async getUserByReferralCode(referralCode: string) {
        return prisma.user.findUnique({
            where: { ReferralCode: referralCode }
        });
    }

    static async getReferrals(userId: number) {
        // Fetch users referred by the current user
        const referredUsers = await prisma.user.findMany({
            where: {
                ReferredById: userId
            },
            select: {
                UserId: true,
                Username: true,
                Email: true,
                CreatedAt: true
            }
        });

        // Fetch the user who referred the current user
        const referredBy = await prisma.user.findUnique({
            where: {
                UserId: userId
            },
            select: {
                ReferredBy: {
                    select: {
                        UserId: true,
                        Username: true,
                        Email: true
                    }
                }
            }
        });

        return {
            referredBy: referredBy?.ReferredBy || null,
            referredUsers
        };
    }
}
