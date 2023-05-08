import express, { Request, Response, ErrHndl } from 'express';
// import userRouter from './routes/userRouter';
import path from 'path';
import userRouter from './controllers/userController.js';

const app = express();
const PORT = 6666;

// Add body parser
app.use(express.json());

app.use(express.static(path.join(__dirname, '../index')));

//Endpoints
app.use('/users', userRouter);
// app.use('/jobs', jobsRouter)

// Handle invalid endpoint
app.use((req: express.Request, res: express.Response) => {
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
app.use((err: ErrHndl, req: Request, res: Response) => {
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
