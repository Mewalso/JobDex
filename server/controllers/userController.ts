import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/userModel';

type UserController = {
  login: RequestHandler;
  chooseStarter: RequestHandler;
  googleLogin: RequestHandler;
  signupGoogle: RequestHandler;
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
          res.cookie('userIdCookie', data.rows[0].id);
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

  chooseStarter: async (req: Request, res: Response, next: NextFunction) => {
    const { starter } = req.body;
    const { userIdCookie } = req.cookies;
    const credentials = [starter.toString(), userIdCookie];
    try {
      console.log('in userController.chooseStarter');
      const userInfo = `UPDATE users SET pokemon = $1 WHERE id = $2;`;
      /* 
          UPDATE table_name
          SET column1 = value1, column2 = value2, ...
          WHERE condition;
        */
      db.query(userInfo, credentials).then((users: any) => {
        if (!users) {
          res.status(404).send('pokemon not saved, please check user id');
          return next();
        }
        res.locals.pokemon = starter;
        return next();
      });
    } catch (err) {
      next({
        log: err,
        status: 500,
        messsage: 'Error in userController.chooseStarter middleware',
      });
    }
  },
  googleLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const credentials = [email.toString()];
    try {
      //trying to login with user
      // const user  = `SELECT * FROM job_table INNER JOIN users ON users.jobs = job_table.id WHERE users.email = $1 AND users.password = $2;`;
      const verify = `SELECT id, pokemon FROM users WHERE email = $1;`;
      db.query(verify, credentials).then((data: any) => {
        if (!data.rows.length) {
          //create post to user database
          // res.locals.email = email;
          // userController.signupGoogle(req, res, next);
          const credentials = [email.toString()];
          const userInfo = `INSERT INTO users (email)
        VALUES ($1) RETURNING id`;
          db.query(userInfo, credentials).then((data: any) => {
            if (!data) {
              res.status(404).send('Email already in use');
              return next();
            }
            //set cookie and return pokemon (will be null)
            res.cookie('userIdCookie', data.rows[0].id);
            res.locals.pokemon = data.rows[0].pokemon;
            console.log('res.locals.pokemon: ', res.locals.pokemon);
            return next();
          });
        } else {
          //get the pokemon here
          //create cookie
          res.cookie('userIdCookie', data.rows[0].id);
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

  //Google signup with username, password, email
  signupGoogle: async (_: Request, res: Response, next: NextFunction) => {
    console.log('email: ', res.locals.email);
    const { email } = res.locals;
    const credentials = [email.toString()];
    try {
      console.log('in userController.signupGoogle');
      const userInfo = `INSERT INTO users (email)
        VALUES ($1) RETURNING id`;
      db.query(userInfo, credentials).then((data: any) => {
        console.log('data inside userController.signupGoogle: ', data);
        if (!data) {
          res.status(404).send('Email already in use');
          return next();
        }
        //set cookie and return pokemon (will be null)
        res.cookie('userIdCookie', data.rows[0].id);
        res.locals.pokemon = data.rows[0].pokemon;
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
};

export default userController;
