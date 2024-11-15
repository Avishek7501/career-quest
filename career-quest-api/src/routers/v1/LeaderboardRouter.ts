// src/routes/v1/leaderboardRoutes.ts
import { Router, Request, Response } from 'express';
import { LeaderboardController } from '../../controllers/v1/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

// GET all leaderboard entries
leaderboardRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response = await leaderboardController.getAllLeaderboards();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// GET leaderboard entry by ID
leaderboardRouter.get(
    '/:leaderboardId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ leaderboardId: string }>, res: Response) => {
        try {
            const leaderboardId = parseInt(req.params.leaderboardId, 10);
            if (isNaN(leaderboardId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid leaderboard ID' });
            }

            const response =
                await leaderboardController.getLeaderboardById(leaderboardId);
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create new leaderboard entry
leaderboardRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await leaderboardController.createLeaderboard(
            req.body
        );
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// PUT update leaderboard entry by ID
leaderboardRouter.put(
    '/:leaderboardId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ leaderboardId: string }>, res: Response) => {
        try {
            const leaderboardId = parseInt(req.params.leaderboardId, 10);
            if (isNaN(leaderboardId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid leaderboard ID' });
            }

            const response = await leaderboardController.updateLeaderboard(
                leaderboardId,
                req.body
            );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
);

// DELETE leaderboard entry by ID
leaderboardRouter.delete(
    '/:leaderboardId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ leaderboardId: string }>, res: Response) => {
        try {
            const leaderboardId = parseInt(req.params.leaderboardId, 10);
            if (isNaN(leaderboardId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid leaderboard ID' });
            }

            await leaderboardController.deleteLeaderboard(leaderboardId);
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default leaderboardRouter;
