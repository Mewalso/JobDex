import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/login', userController.login, userController.getJobs, (_: Request, res: Response) => {
  return res.status(200).json({pokemon: res.locals.pokemon, jobs: res.locals.jobs});
});

router.post('/signup', userController.signup, (_: Request, res: Response) => {
  return res.status(201).json(res.locals.users);
});

export default router;
