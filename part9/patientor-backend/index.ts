import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
