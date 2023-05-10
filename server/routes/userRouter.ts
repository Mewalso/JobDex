import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/login', userController.login, (_: Request, res: Response) => {
  return res.status(200).json(res.locals.pokemon);
});

router.post('/signup', userController.signup, (_: Request, res: Response) => {
  return res.status(201).json(res.locals.pokemon);
});

router.post(
  '/chooseStarter',
  userController.chooseStarter,
  (_: Request, res: Response) => {
    return res.status(201).json(res.locals.pokemon);
  }
);

router.post(
  '/googleLogin',
  userController.googleLogin,
  (_: Request, res: Response) => {
    return res.status(201).json(res.locals.pokemon);
  }
);

export default router;
