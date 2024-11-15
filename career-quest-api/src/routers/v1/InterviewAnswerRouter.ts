// src/routes/v1/interviewAnswerRoutes.ts
import { Router, Request, Response } from 'express';
import { InterviewAnswerController } from '../../controllers/v1/InterviewAnswerController';

const interviewAnswerRouter = Router();
const interviewAnswerController = new InterviewAnswerController();

// GET all interview answers
interviewAnswerRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response =
            await interviewAnswerController.getAllInterviewAnswers();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// GET interview answer by ID
interviewAnswerRouter.get(
    '/:interviewAnswerId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ interviewAnswerId: string }>, res: Response) => {
        try {
            const interviewAnswerId = parseInt(
                req.params.interviewAnswerId,
                10
            );
            if (isNaN(interviewAnswerId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid interview answer ID' });
            }

            const response =
                await interviewAnswerController.getInterviewAnswerById(
                    interviewAnswerId
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create new interview answer
interviewAnswerRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await interviewAnswerController.createInterviewAnswer(
            req.body
        );
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// PUT update interview answer by ID
interviewAnswerRouter.put(
    '/:interviewAnswerId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ interviewAnswerId: string }>, res: Response) => {
        try {
            const interviewAnswerId = parseInt(
                req.params.interviewAnswerId,
                10
            );
            if (isNaN(interviewAnswerId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid interview answer ID' });
            }

            const response =
                await interviewAnswerController.updateInterviewAnswer(
                    interviewAnswerId,
                    req.body
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
);

// DELETE interview answer by ID
interviewAnswerRouter.delete(
    '/:interviewAnswerId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ interviewAnswerId: string }>, res: Response) => {
        try {
            const interviewAnswerId = parseInt(
                req.params.interviewAnswerId,
                10
            );
            if (isNaN(interviewAnswerId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid interview answer ID' });
            }

            await interviewAnswerController.deleteInterviewAnswer(
                interviewAnswerId
            );
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default interviewAnswerRouter;
