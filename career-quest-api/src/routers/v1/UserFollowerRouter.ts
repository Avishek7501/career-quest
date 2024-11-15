// src/routes/v1/userFollowerRoutes.ts
import { Router, Request, Response } from 'express';
import { UserFollowerController } from '../../controllers/v1/UserFollowerController';

const userFollowerRouter = Router();
const userFollowerController = new UserFollowerController();

// GET all followers of a user
userFollowerRouter.get(
    '/:toUserId/followers',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ toUserId: string }>, res: Response) => {
        try {
            console.log('Request Params:', req.params);
            const toUserId = parseInt(req.params.toUserId, 10);
            if (isNaN(toUserId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            const response =
                await userFollowerController.getFollowersOfUser(toUserId);
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
);

// GET all users followed by a user
userFollowerRouter.get(
    '/:fromUserId/following',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ fromUserId: string }>, res: Response) => {
        try {
            const fromUserId = parseInt(req.params.fromUserId, 10);
            if (isNaN(fromUserId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            const response =
                await userFollowerController.getFollowingOfUser(fromUserId);
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
);

// GET a follower relationship between two users
userFollowerRouter.get(
    '/:fromUserId/:toUserId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (
        req: Request<{ fromUserId: string; toUserId: string }>,
        res: Response
    ) => {
        try {
            const fromUserId = parseInt(req.params.fromUserId, 10);
            const toUserId = parseInt(req.params.toUserId, 10);
            if (isNaN(fromUserId) || isNaN(toUserId)) {
                return res.status(400).json({ message: 'Invalid user IDs' });
            }

            const response = await userFollowerController.getUserFollower(
                fromUserId,
                toUserId
            );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create a follower relationship between two users
userFollowerRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await userFollowerController.createUserFollower(
            req.body
        );
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// DELETE a follower relationship between two users
userFollowerRouter.delete(
    '/:fromUserId/:toUserId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (
        req: Request<{ fromUserId: string; toUserId: string }>,
        res: Response
    ) => {
        try {
            const fromUserId = parseInt(req.params.fromUserId, 10);
            const toUserId = parseInt(req.params.toUserId, 10);
            if (isNaN(fromUserId) || isNaN(toUserId)) {
                return res.status(400).json({ message: 'Invalid user IDs' });
            }

            await userFollowerController.deleteUserFollower(
                fromUserId,
                toUserId
            );
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default userFollowerRouter;
