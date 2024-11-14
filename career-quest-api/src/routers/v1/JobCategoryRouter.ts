import { Request, Response, Router } from 'express';

import { JobCategoryController } from '../../controllers/v1/JobCategoryController';

const jobCategoryRouter = Router();
const jobCategoryController = new JobCategoryController();

jobCategoryRouter.get('/', async (req, res) => {
    try {
        const response = await jobCategoryController.getAllCategories();
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
jobCategoryRouter.get('/:categoryId', async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.categoryId, 10);
        if (isNaN(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const response =
            await jobCategoryController.getCategoryById(categoryId);
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(404).json({ message: errorMessage });
    }
});

jobCategoryRouter.post('/', async (req, res) => {
    try {
        const response = await jobCategoryController.createCategory(req.body);
        res.status(201).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
jobCategoryRouter.put('/:categoryId', async (req, res) => {
    try {
        const categoryId = parseInt(req.params.categoryId, 10);
        if (isNaN(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const response = await jobCategoryController.updateCategory(
            categoryId,
            req.body
        );
        res.json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
jobCategoryRouter.delete('/:categoryId', async (req, res) => {
    try {
        const categoryId = parseInt(req.params.categoryId, 10);
        if (isNaN(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        await jobCategoryController.deleteCategory(categoryId);
        res.status(204).send();
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(404).json({ message: errorMessage });
    }
});

export default jobCategoryRouter;
