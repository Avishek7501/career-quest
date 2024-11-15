// src/routes/v1/jobSimulationRoutes.ts
import { Router, Request, Response } from 'express';
import { JobSimulationController } from '../../controllers/v1/JobSimulationController';

const jobSimulationRouter = Router();
const jobSimulationController = new JobSimulationController();

// GET all job simulations
jobSimulationRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response = await jobSimulationController.getAllJobSimulations();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// GET job simulation by ID
jobSimulationRouter.get(
    '/:jobSimulationId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSimulationId: string }>, res: Response) => {
        try {
            const jobSimulationId = parseInt(req.params.jobSimulationId, 10);
            if (isNaN(jobSimulationId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job simulation ID' });
            }

            const response =
                await jobSimulationController.getJobSimulationById(
                    jobSimulationId
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create new job simulation
jobSimulationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await jobSimulationController.createJobSimulation(
            req.body
        );
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// PUT update job simulation by ID
jobSimulationRouter.put(
    '/:jobSimulationId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSimulationId: string }>, res: Response) => {
        try {
            const jobSimulationId = parseInt(req.params.jobSimulationId, 10);
            if (isNaN(jobSimulationId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job simulation ID' });
            }

            const response = await jobSimulationController.updateJobSimulation(
                jobSimulationId,
                req.body
            );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
);

// DELETE job simulation by ID
jobSimulationRouter.delete(
    '/:jobSimulationId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSimulationId: string }>, res: Response) => {
        try {
            const jobSimulationId = parseInt(req.params.jobSimulationId, 10);
            if (isNaN(jobSimulationId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job simulation ID' });
            }

            await jobSimulationController.deleteJobSimulation(jobSimulationId);
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// GET job simulation by ID
jobSimulationRouter.get(
    '/:jobSimulationId/start',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSimulationId: string }>, res: Response) => {
        try {
            const jobSimulationId = parseInt(req.params.jobSimulationId, 10);
            if (isNaN(jobSimulationId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job simulation ID' });
            }

            const response =
                await jobSimulationController.startSimulation(jobSimulationId);
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default jobSimulationRouter;
