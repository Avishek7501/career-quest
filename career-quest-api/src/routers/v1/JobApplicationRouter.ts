// src/routes/v1/jobApplicationRoutes.ts
import { Router, Request, Response } from 'express';
import { JobApplicationController } from '../../controllers/v1/JobApplicationController';

const jobApplicationRouter = Router();
const jobApplicationController = new JobApplicationController();

// GET all job applications
jobApplicationRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response = await jobApplicationController.getAllJobApplications();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// GET job application by ID
jobApplicationRouter.get(
    '/:jobApplicationId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobApplicationId: string }>, res: Response) => {
        try {
            const jobApplicationId = parseInt(req.params.jobApplicationId, 10);
            if (isNaN(jobApplicationId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job application ID' });
            }

            const response =
                await jobApplicationController.getJobApplicationById(
                    jobApplicationId
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create new job application
jobApplicationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await jobApplicationController.createJobApplication(
            req.body
        );
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// PUT update job application by ID
jobApplicationRouter.put(
    '/:jobApplicationId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobApplicationId: string }>, res: Response) => {
        try {
            const jobApplicationId = parseInt(req.params.jobApplicationId, 10);
            if (isNaN(jobApplicationId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job application ID' });
            }

            const response =
                await jobApplicationController.updateJobApplication(
                    jobApplicationId,
                    req.body
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
);

// DELETE job application by ID
jobApplicationRouter.delete(
    '/:jobApplicationId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobApplicationId: string }>, res: Response) => {
        try {
            const jobApplicationId = parseInt(req.params.jobApplicationId, 10);
            if (isNaN(jobApplicationId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job application ID' });
            }

            await jobApplicationController.deleteJobApplication(
                jobApplicationId
            );
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default jobApplicationRouter;
