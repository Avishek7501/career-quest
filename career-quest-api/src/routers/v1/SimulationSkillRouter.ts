// src/routes/v1/jobSimulationSkillRoutes.ts
import { Router, Request, Response } from 'express';
import { JobSimulationSkillController } from '../../controllers/v1/JobSimulationSkillController';

const jobSimulationSkillRouter = Router();
const jobSimulationSkillController = new JobSimulationSkillController();

// GET all job simulation skills
jobSimulationSkillRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response =
            await jobSimulationSkillController.getAllJobSimulationSkills();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// GET job simulation skill by ID
jobSimulationSkillRouter.get(
    '/:jobSimulationSkillId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSimulationSkillId: string }>, res: Response) => {
        try {
            const jobSimulationSkillId = parseInt(
                req.params.jobSimulationSkillId,
                10
            );
            if (isNaN(jobSimulationSkillId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job simulation skill ID' });
            }

            const response =
                await jobSimulationSkillController.getJobSimulationSkillById(
                    jobSimulationSkillId
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create new job simulation skill
jobSimulationSkillRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response =
            await jobSimulationSkillController.createJobSimulationSkill(
                req.body
            );
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// PUT update job simulation skill by ID
jobSimulationSkillRouter.put(
    '/:jobSimulationSkillId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSimulationSkillId: string }>, res: Response) => {
        try {
            const jobSimulationSkillId = parseInt(
                req.params.jobSimulationSkillId,
                10
            );
            if (isNaN(jobSimulationSkillId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job simulation skill ID' });
            }

            const response =
                await jobSimulationSkillController.updateJobSimulationSkill(
                    jobSimulationSkillId,
                    req.body
                );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
);

// DELETE job simulation skill by ID
jobSimulationSkillRouter.delete(
    '/:jobSimulationSkillId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSimulationSkillId: string }>, res: Response) => {
        try {
            const jobSimulationSkillId = parseInt(
                req.params.jobSimulationSkillId,
                10
            );
            if (isNaN(jobSimulationSkillId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job simulation skill ID' });
            }

            await jobSimulationSkillController.deleteJobSimulationSkill(
                jobSimulationSkillId
            );
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default jobSimulationSkillRouter;
