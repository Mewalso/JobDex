import express, { Request, Response } from 'express';
// import express from 'express';
// import userRouter from './routes/userRouter';
import path from 'path';
import userRouter from './routes/userRouter';
import jobController from './controllers/jobController'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 6666;

// Add body parser and cookie parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../index')));

app.get('/jobs', jobController.getJobs, (_: Request, res: Response) => {
  return res.status(200).json(res.locals.jobs)
})
app.post('/createJobs', jobController.createJobs, (_: Request, res: Response) => {
  return res.status(201).json(res.locals.jobs)
})
app.patch('/updateJobs', jobController.updateJobs, (_: Request, res: Response) => {
  return res.status(204).json(res.locals.jobs)
})
app.delete('/deleteJobs', jobController.deleteJobs, (_: Request, res: Response) => {
  return res.status(202).json(res.locals.jobs)
})
//Endpoints
app.use('/users', userRouter);

app.get('/', (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// // Handle invalid endpoint
app.use((_: Request, res: express.Response) => {
  res.status(404).send('Not Found');
});

//creates type for error handler
type ErrHndl = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

// Handle errors
app.use((err: ErrHndl, _: Request, res: Response) => {
  const defaultErr: ErrHndl = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ErrHndl = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
