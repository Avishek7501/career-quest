// src/routes/v1/leaderboardRoutes.ts
import { Router, Request, Response } from 'express';
import { LeaderboardController } from '../../controllers/v1/LeaderboardController';
import { PrismaClient } from '@prisma/client';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

const prisma = new PrismaClient();

export const updateLeaderboard = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { userId, questionId, selectedAnswerId } = req.body;

        // Fetch the question and validate the answer
        const question = await prisma.interviewQuestion.findUnique({
            where: { InterviewQuestionId: questionId },
            include: { InterviewAnswers: true }
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const selectedAnswer = question.InterviewAnswers.find(
            (answer) => answer.InterviewAnswerId === selectedAnswerId
        );

        if (!selectedAnswer) {
            return res.status(400).json({ message: 'Invalid answer selected' });
        }

        const isCorrect = selectedAnswer.IsCorrect;

        // Calculate the score (e.g., 1 point for correct, 0 for incorrect)
        const currentScore = isCorrect ? 1 : 0;

        // Fetch the user's current leaderboard entry
        const leaderboardEntry = await prisma.leaderboard.findUnique({
            where: { UserId: userId }
        });

        if (!leaderboardEntry) {
            // If no leaderboard entry exists, create one
            await prisma.leaderboard.create({
                data: {
                    UserId: userId,
                    CurrentScore: currentScore,
                    TotalScore: currentScore // Initial score
                }
            });
        } else {
            // Update the existing leaderboard entry
            await prisma.leaderboard.update({
                where: { LeaderboardId: leaderboardEntry.LeaderboardId },
                data: {
                    CurrentScore: currentScore,
                    TotalScore: leaderboardEntry.TotalScore + currentScore
                }
            });
        }

        return res.status(200).json({
            message: isCorrect
                ? 'Correct answer! Score updated.'
                : 'Incorrect answer. Better luck next time!'
        });
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
leaderboardRouter.post('/score/update', updateLeaderboard);

export default leaderboardRouter;
