// src/routes/v1/interviewQuestionRoutes.ts
import { Router, Request, Response } from 'express';
import { InterviewQuestionController } from '../../controllers/v1/InterviewQuestionController';

const interviewQuestionRouter = Router();
const interviewQuestionController = new InterviewQuestionController();

// GET all interview questions
interviewQuestionRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response =
            await interviewQuestionController.getAllInterviewQuestions();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// GET interview question by ID
interviewQuestionRouter.get(
    '/:interviewQuestionId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ interviewQuestionId: string }>, res: Response) => {
        try {
            const interviewQuestionId = parseInt(
                req.params.interviewQuestionId,
                10
            );
            if (isNaN(interviewQuestionId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid interview question ID' });
            }

            const response =
                await interviewQuestionController.getInterviewQuestionById(
                    interviewQuestionId
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create new interview question
interviewQuestionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response =
            await interviewQuestionController.createInterviewQuestion(req.body);
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// PUT update interview question by ID
interviewQuestionRouter.put(
    '/:interviewQuestionId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ interviewQuestionId: string }>, res: Response) => {
        try {
            const interviewQuestionId = parseInt(
                req.params.interviewQuestionId,
                10
            );
            if (isNaN(interviewQuestionId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid interview question ID' });
            }

            const response =
                await interviewQuestionController.updateInterviewQuestion(
                    interviewQuestionId,
                    req.body
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
);

// DELETE interview question by ID
interviewQuestionRouter.delete(
    '/:interviewQuestionId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ interviewQuestionId: string }>, res: Response) => {
        try {
            const interviewQuestionId = parseInt(
                req.params.interviewQuestionId,
                10
            );
            if (isNaN(interviewQuestionId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid interview question ID' });
            }

            await interviewQuestionController.deleteInterviewQuestion(
                interviewQuestionId
            );
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default interviewQuestionRouter;
