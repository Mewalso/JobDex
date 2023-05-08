import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/login', userController.login, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.jobs);
});

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  return res.status(201);
});

export default router;
