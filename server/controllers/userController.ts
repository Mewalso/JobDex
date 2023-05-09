import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/userModel';

type UserController = {
  login: RequestHandler;
  signup: RequestHandler;
  getJobs: RequestHandler;
  //   googleLogin: RequestHandler;
};

const userController: UserController = {
  //regular login with email and password
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const credentials = [email.toString(), password];
    try {
      //trying to login with user
      // const user  = `SELECT * FROM job_table INNER JOIN users ON users.jobs = job_table.id WHERE users.email = $1 AND users.password = $2;`;
      const verify = `SELECT id, pokemon FROM users WHERE email = $1 AND password = $2;`;
      db.query(verify, credentials).then((data: any) => {
        if (!data) {
          res.status(404).send('User could found');
          return next();
        } else {
          console.log('data: ', data);
          //get the pokemon here
          //create cookie
          res.cookie('id', data.rows[0].id);
          res.locals.pokemon = data.rows[0].pokemon;
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
      console.log('in userController.signup');
      const userInfo = `INSERT INTO users (username, password, email)
        VALUES ($1, $2, #3)`;
      db.query(userInfo, credentials).then((users: any) => {
        if (!users) {
          res.status(404).send('Email already in use');
          return next();
        }
        res.locals.users = users;
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
  getJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //query
      // console.log('res.locals.id: ', res.locals.id)
      const { id } = req.cookies;
      const credentials = [id];
      const jobsQuery = `SELECT * FROM job_table WHERE job_table.user_id = $1`;

      //get jobs function
      db.query(jobsQuery, credentials).then((data: any) => {
        console.log('jobs from getJobs: ', data.rows);
        res.locals.jobs = data.rows;
        return next();
      });
    } catch (err) {
      return next({
        log: err,
        status: 500,
        message: 'Error in userController.getJobs middleware',
      });
    }
  },
};

export default userController;
