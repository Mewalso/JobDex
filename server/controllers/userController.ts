import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/userModel';

type UserController = {
  login: RequestHandler;
  signup: RequestHandler;
  //   googleLogin: RequestHandler;
};

const userController: UserController = {
  //regular login with email and password
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.params;
    const credentials = [email, password];
    try {
      //trying to login with user 
      const user  = `SELECT * FROM job_table INNER JOIN users ON users.jobs = job_table._id WHERE job_table.email = $1 AND job_table.password = $2`;
      db.query(user, credentials).then((jobs:any) => {
        if (!jobs) {
          res.status(404).send('User could found');
          return next();
        } else {
          res.locals.jobs = jobs;
          return next();
        }
      });
    } catch (err) {
      next({
        log: err,
        status: 500,
        messsage: 'Error in userController.login middleware',
      });
    }
  },
  //regular signup with username, password, email
  signup: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;
    const credentials = [username, password, email];
    try {
      console.log('in userController.signup')
      const userInfo = `INSERT INTO users (username, password, email)
        VALUES ($1, $2, #3)`;
      db.query(userInfo, credentials)
      .then((users:any) => {
        if (!users) {
          res.status(404).send('Email already in use');
          return next();
        }
        res.locals.users=users
        return next();
      });
    } catch (err) {
      next({
        log: err,
        status: 500,
        messsage: 'Error in userController.signup middleware',
      });
    }
  },
  //   googleLogin: async (req: Request, res: Response, next: NextFunction) => {
  //     const { username, email } = req.params;
  //     try {
  //       const createdUser = `INSERT INTO users (username, email)
  //         VALUE (${username}, ${email})`;
  //       db.query(createdUser).then((user) => {
  //         if (!user) {
  //           res.status(404).send('User not found');
  //           return next();
  //         } else {
  //           res.locals.user = user;
  //           return next();
  //         }
  //       });
  //     } catch (err) {
  //       next({
  //         log: err,
  //         status: 500,
  //         messsage: 'Error in userController.signup middleware',
  //       });
  //     }
  //   },
};

export default userController;
