// src/routes/v1/authRoutes.ts
import { Router, type Request, type Response } from 'express';

import { AuthController } from '../../controllers/v1/AuthController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', async (req, res) => {
    try {
        const response = await authController.register(req.body);
        res.json(response);
    } catch (error) {
        // Cast error to Error type
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const response = await authController.login(req.body);
        res.json(response);
    } catch (error) {
        // Cast error to Error type
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

authRouter.get('/status', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const response = await authController.checkLoginStatus(authHeader);
        res.json(response);
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
    }
});

authRouter.get('/profile/:userId', async (req, res) => {
    try {
        // Check if req.user is defined
        const userId = parseInt(req.params.userId, 10);
        if (!userId) {
            res.status(401).json({
                message: 'Unauthorized: User not authenticated'
            });
            return;
        }

        const response = await authController.getProfile(userId);
        res.json(response);
    } catch (error) {
        // Cast error to Error type
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
authRouter.post('/logout', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: 'Authorization header is missing' });
        }
        const response = await authController.logout(authHeader);
        res.json(response);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

export default authRouter;
