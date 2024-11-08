import { Router } from 'express';

import HelloController from '../../controllers/v1/HelloController';

const router = Router();
const helloController = new HelloController();

router.get('/', async (req, res) => {
    const response = await helloController.hello();
    res.json(response);
});

export default router;
