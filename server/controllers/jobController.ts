import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../models/userModel';

type jobController = {
  getJobs: RequestHandler;
  createJobs: RequestHandler;
  updateJobs: RequestHandler;
  deleteJobs: RequestHandler;
};

const jobController: jobController = {
    getJobs: async (req: Request, res: Response, next: NextFunction) => {
        try {
          //query
          const { userIdCookie } = req.cookies;
          const credentials = [userIdCookie];
          const jobsQuery = `SELECT * FROM job_table WHERE job_table.user_id = $1`;
    
          //get jobs function
          db.query(jobsQuery, credentials).then((data: any) => {
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
      createJobs: async (req: Request, res: Response, next: NextFunction) => {
        try {
          //query
          // console.log('res.locals.id: ', res.locals.id)
          const { userIdCookie } = req.cookies;
          const { link, app_contact, cover_letter, status, dd, dd_name, dd_message, dd_contact_info, dd_follow_up, dd_follow_up_date } = req.body ;
          const jobsQuery = `INSERT INTO job_table (company, position, user_id, link, app_contact, double_down, cover_letter, status) VALUES ("New Company", "New Job", $1, $2, $3, $4, $5, $6, $7, $8)`;
          const fields = [userIdCookie, link, app_contact, cover_letter, status, dd, dd_name, dd_message, dd_contact_info, dd_follow_up, dd_follow_up_date]
    
          //get jobs function
          db.query(jobsQuery, fields).then((data: any) => {
            //ask about what to send back to the front-end
            // res.locals.jobs = { company: company, };
            res.locals.data = data.rows
            return next();
          });
        } catch (err) {
          return next({
            log: err,
            status: 500,
            message: 'Error in userController.createJobs middleware',
          });
        }
      },
      updateJobs: async (req: Request, res: Response, next: NextFunction) => {
        try {
          //query
          // console.log('res.locals.id: ', res.locals.id)
          const { userIdCookie } = req.cookies;
          const { company, position, link, app_contact, cover_letter, status, dd, dd_name, dd_message, dd_contact_info, dd_follow_up, dd_follow_up_date} = req.body ;
          /*
            UPDATE table_name
            SET column1 = value1, column2 = value2, ...
            WHERE condition;
          */
          const updateJobsQuery = `UPDATE job_table SET company = $1, position = $2, user_id = $3, link = $4, app_contact = $5, double_down = $6, cover_letter = $7, status = $8 WHERE id = $9`;
          const fields = [company, position, userIdCookie, link, app_contact, double_down, cover_letter, status, id]
    
          //get jobs function
          db.query(updateJobsQuery, fields).then((data: any) => {
            res.locals.data = data.rows
            return next();
          });
        } catch (err) {
          return next({
            log: err,
            status: 500,
            message: 'Error in userController.updateJobs middleware',
          });
        }
      },
      deleteJobs: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.body ;
          /*
            DELETE FROM table_name WHERE condition;
          */
          const deleteJobsQuery = `DELETE FROM job_table WHERE id = $1`;
          const fields = [id]
    
          //get jobs function
          db.query(deleteJobsQuery, fields).then((data: any) => {
            res.locals.data = data.rows
            return next();
          });
        } catch (err) {
          return next({
            log: err,
            status: 500,
            message: 'Error in userController.deleteJobs middleware',
          });
        }
      },

};

export default jobController;
