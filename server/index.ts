'use strict';

import express, { Request, Response } from 'express';
import router from './router.js';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Running on port ${PORT} 📚`));
