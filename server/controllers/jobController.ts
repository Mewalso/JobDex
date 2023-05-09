import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/userModel';

type jobController = {
  getJobs: RequestHandler;

  //   googleLogin: RequestHandler;
};

const jobController: jobController = {
    getJobs: async (req: Request, res: Response, next: NextFunction) => {
        try {
          //query
          // console.log('res.locals.id: ', res.locals.id)
          const { userIdCookie } = req.cookies;
          const credentials = [userIdCookie];
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

export default jobController;
