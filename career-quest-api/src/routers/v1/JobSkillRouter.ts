// src/routes/v1/jobSkillRoutes.ts
import { Router, Request, Response } from 'express';
import { JobSkillController } from '../../controllers/v1/JobSkillController';

const jobSkillRouter = Router();
const jobSkillController = new JobSkillController();

// GET all job skills
jobSkillRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response = await jobSkillController.getAllJobSkills();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// GET job skill by ID
jobSkillRouter.get(
    '/:jobSkillId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSkillId: string }>, res: Response) => {
        try {
            const jobSkillId = parseInt(req.params.jobSkillId, 10);
            if (isNaN(jobSkillId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job skill ID' });
            }

            const response =
                await jobSkillController.getJobSkillById(jobSkillId);
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

// POST create new job skill
jobSkillRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await jobSkillController.createJobSkill(req.body);
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// PUT update job skill by ID
jobSkillRouter.put(
    '/:jobSkillId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSkillId: string }>, res: Response) => {
        try {
            const jobSkillId = parseInt(req.params.jobSkillId, 10);
            if (isNaN(jobSkillId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job skill ID' });
            }

            const response = await jobSkillController.updateJobSkill(
                jobSkillId,
                req.body
            );
            res.json(response);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
);

// DELETE job skill by ID
jobSkillRouter.delete(
    '/:jobSkillId',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (req: Request<{ jobSkillId: string }>, res: Response) => {
        try {
            const jobSkillId = parseInt(req.params.jobSkillId, 10);
            if (isNaN(jobSkillId)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid job skill ID' });
            }

            await jobSkillController.deleteJobSkill(jobSkillId);
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(404).json({ message: errorMessage });
        }
    }
);

export default jobSkillRouter;
