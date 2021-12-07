import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const options: cors.CorsOptions = {
  origin: 'http://localhost:3000',
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));

const PORT = 3001;

app.get('/api/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
