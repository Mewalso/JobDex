import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/login', userController.login, (_: Request, res: Response) => {
  return res.status(200).json(res.locals.jobs);
});

router.post('/signup', userController.signup, (_: Request, res: Response) => {
  return res.status(201).json(res.locals.users);
});

export default router;
