import express, { Request, Response } from 'express';
// import express from 'express';
// import userRouter from './routes/userRouter';
import path from 'path';
import userRouter from './routes/userRouter';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 6666;

// Add body parser and cookie parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../index')));

//Endpoints
app.use('/users', userRouter);
// app.use('/jobs', jobsRouter)

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
